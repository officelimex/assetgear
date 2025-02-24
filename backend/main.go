package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/config"
	"github.com/officelimex/assetgear/database"
	"github.com/officelimex/assetgear/routes"
)

func main() {
	config.ConnectDB() 

	database.Migrate()

	route := gin.Default()
	endPoints := route.Group("/v1/api")
	{

		routes.AuthRouter(endPoints)
		// routes.SetupRouter(endPoints)
		// routes.SalesCustomerRoute(endPoints)

	}

	log.Println("Server is running on :8080")
	route.Run(":8080") 
}
