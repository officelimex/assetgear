package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/controllers"
)

func AuthRouter(router *gin.RouterGroup) {

	auth := router.Group("/auth")
	// auth.Use(middleware.AuthMiddleware())
	{
		auth.POST("/signin", controllers.SignIn)
		auth.POST("/verify-otp", controllers.VerifyOTP)
		auth.POST("/reset-password", controllers.ResetPassword)
		auth.POST("/send-otp", controllers.SendOTP)
	}

}
