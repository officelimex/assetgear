package controllers

import (
	"fmt"
	"log"
	"os"

	"github.com/aro-wolo/goresp"
	"github.com/aro-wolo/gosend"
	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/config"
	"github.com/officelimex/assetgear/dao"
	"github.com/officelimex/assetgear/models"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your_secret_key")

// SignIn handles user login
func SignIn(ctx *gin.Context) {
	var loginData struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	res := goresp.New(ctx)

	if !res.ShouldBind(&loginData) {
		return
	}

	udoa := dao.NewUserDAO()
	user, err := udoa.GetUserByEmail(loginData.Email)
	if err != nil {
		res.Error404("User not found")
		return
	}

	// Verify password
	if !models.CheckPasswordHash(loginData.Password, user.Password) {
		res.Error404("Invalid credentials")
		return
	}

	token, _ := models.GenerateJWT(*user)
	ctx.SetCookie("token", token, 3600, "/", "", false, true)

	res.Ok(token, "")
}

// VerifyOTP handles OTP verification
func VerifyOTP(ctx *gin.Context) {
	var otpData struct {
		Email string `json:"email"`
		OTP   string `json:"otp"`
	}

	res := goresp.New(ctx)

	if !res.ShouldBind(&otpData) {
		return
	}

	udoa := dao.NewUserDAO()
	isValid, err := udoa.VerifyOTP(otpData.Email, otpData.OTP)
	if err != nil {
		res.Error404("User not found")
		return
	}

	if !isValid {
		res.Error404("Invalid OTP")
		return
	}

	res.Ok(nil, "OTP verified successfully")
}

// ResetPassword handles password reset
func ResetPassword(ctx *gin.Context) {
	var resetData struct {
		OTP         string `json:"otp"`
		Email       string `json:"email"`
		NewPassword string `json:"new_password"`
	}
	res := goresp.New(ctx)
	if !res.ShouldBind(&resetData) {
		return
	}

	udoa := dao.NewUserDAO()
	isValid, err := udoa.VerifyOTP(resetData.Email, resetData.OTP)
	if err != nil {
		res.Error404("User not found")
		return
	}

	if !isValid {
		res.Error404("Invalid OTP")
		return
	}

	user, err := udoa.GetUserByEmail(resetData.Email)
	if err != nil {
		res.AccessDenied("not found")
		return
	}

	// Hash new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(resetData.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		res.ServerError("Failed to hash password")
		return
	}

	user.Password = string(hashedPassword)
	if err := udoa.UpdateUser(user); err != nil {
		res.ServerError("Failed to update password")
		return
	}

	res.Ok(nil, "Password reset successful")
}

// SendOTP handles sending OTP to user's email
func SendOTP(c *gin.Context) {
	var request struct {
		Email string `json:"email" binding:"required,email"`
	}

	res := goresp.New(c)
	// Validate the request payload.
	if err := c.ShouldBind(&request); err != nil {
		res.BadRequest(err.Error())
		return
	}

	otp, err := dao.NewUserDAO().SaveOTP(request.Email)
	if err != nil {
		res.Error404("User not found")
		return
	}
	template, err := gosend.ParseTemplate("templates/auth/forget-pwd-otp.html")
	if err != nil {
		res.ServerError(err.Error())
	}
	tokenMailTemplate := struct {
		Email     string
		Subject   string
		Token     string
		ResetLink string
	}{
		Email:     request.Email,
		Subject:   "Reset Password with OTP",
		Token:     otp,
		ResetLink: os.Getenv("FRONTEND_URL") + "/auth/verify/" + request.Email + "/" + otp,
	}
	fmt.Println("otp :", otp)
	mailBody, err := template.RenderTemplate(tokenMailTemplate)
	if err != nil {
		log.Fatalf("Failed to render template: %v", err)
	}

	err = gosend.Now(
		*config.SMTPConfig, gosend.Recipients{
			To: []string{request.Email},
		},
		tokenMailTemplate.Subject,
		mailBody,
	)
	if err != nil {
		log.Fatalln(err)
	}

	res.Ok(nil, "OTP sent successfully")
}
