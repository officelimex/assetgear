package database

import (
	"github.com/officelimex/assetgear/config"
	"github.com/officelimex/assetgear/models"
)

func Migrate() {
	config.DB.AutoMigrate(
		&models.Department{},
		&models.User{},
	)
}
