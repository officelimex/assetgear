package controllers

import (
	"net/http"

	"github.com/aro-wolo/goresp"
	"github.com/gin-gonic/gin"
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

	if err := ctx.ShouldBindJSON(&loginData); err != nil {
		goresp.BadRequestResponse(ctx, err.Error())
		return
	}

	udoa := dao.NewUserDAO()
	user, err := udoa.GetUserByEmail(loginData.Email)
	if err != nil {
		goresp.Error404Response(ctx, "User not found")
		return
	}

	// Verify password
	if !models.CheckPasswordHash(loginData.Password, user.Password) {
		goresp.Error404Response(ctx, "Invalid credentials")
		return
	}

	token, _ := models.GenerateJWT(*user)
	ctx.SetCookie("token", token, 3600, "/", "", false, true)

	goresp.OkResponse(ctx, token, "")
}

// VerifyOTP handles OTP verification
func VerifyOTP(ctx *gin.Context) {
	var otpData struct {
		Email string `json:"email"`
		OTP   string `json:"otp"`
	}

	if !goresp.ShouldBindJSON(ctx, &otpData) {
		return
	}

	udoa := dao.NewUserDAO()
	isValid, err := udoa.VerifyOTP(otpData.Email, otpData.OTP)
	if err != nil {
		goresp.Error404Response(ctx, "User not found")
		return
	}

	if !isValid {
		goresp.Error404Response(ctx, "Invalid OTP")
		return
	}

	goresp.OkResponse(ctx, nil, "OTP verified successfully")
}

// ResetPassword handles password reset
func ResetPassword(ctx *gin.Context) {
	var resetData struct {
		OTP         string `json:"otp"`
		Email       string `json:"email"`
		NewPassword string `json:"new_password"`
	}

	if !goresp.ShouldBindJSON(ctx, &resetData) {
		return
	}

	udoa := dao.NewUserDAO()
	isValid, err := udoa.VerifyOTP(resetData.Email, resetData.OTP)
	if err != nil {
		goresp.Error404Response(ctx, "User not found")
		return
	}

	if !isValid {
		goresp.Error404Response(ctx, "Invalid OTP")
		return
	}

	user, err := udoa.GetUserByEmail(resetData.Email)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User not found"})
		return
	}

	// Hash new password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(resetData.NewPassword), bcrypt.DefaultCost)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to hash password"})
		return
	}

	user.Password = string(hashedPassword)
	if err := udoa.UpdateUser(user); err != nil {
		goresp.ServerErrorResponse(ctx, "Failed to update password")
		return
	}

	goresp.OkResponse(ctx, nil, "Password reset successful")
}
