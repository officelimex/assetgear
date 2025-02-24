package controllers

import (
	"net/http"

	"github.com/aro-wolo/goresp"
	"github.com/gin-gonic/gin"
	"github.com/officelimex/assetgear/dao"
)

// Get all assets
func GetAllAssets(c *gin.Context) {

	res := goresp.New(c)
	ad := dao.NewAssetDAO()
	assets, err := ad.GetAllAssets()
	if err != nil {
		res.JSON(http.StatusInternalServerError, "Could not fetch assets", nil, true)
		return
	}

	res.Ok(assets, "")
}
