package routes

import (
	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/controllers"
	"github.com/officelimex/assetgear/middleware"
)

func AuthRouter(router *gin.RouterGroup) {

	auth := router.Group("/auth")
	// auth.Use(middleware.AuthMiddleware())
	{
		auth.POST("/signin", controllers.SignIn)
		auth.POST("/verify-otp", controllers.VerifyOTP)
		auth.POST("/reset-password", controllers.ResetPassword)
		auth.POST("/send-otp", controllers.SendOTP)
		auth.POST("/signout", controllers.SignOut)
	}

}

func UserRouter(router *gin.RouterGroup) {

	user := router.Group("/user", middleware.AuthMiddleware())
	{
		user.GET("/info", controllers.GetUserInfo)
	}

}
