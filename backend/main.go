package main

import (
	"log"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/config"
	"github.com/officelimex/assetgear/database"
	"github.com/officelimex/assetgear/routes"
)

func main() {
	config.Init()

	database.Migrate()

	route := gin.Default()

	// Configure CORS middleware
	route.Use(cors.New(cors.Config{
		AllowOrigins:     []string{os.Getenv("FRONTEND_URL")},
		AllowMethods:     []string{"GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	endPoints := route.Group("/v1/api")
	{
		routes.AuthRouter(endPoints)
		routes.UserRouter(endPoints)
	}

	log.Println("Server is running on :8080")
	route.Run(":8080")
}
