package dao

import (
	"github.com/officelimex/assetgear/config"
	"github.com/officelimex/assetgear/models"
	"gorm.io/gorm"
)

type UserDAO struct {
	db *gorm.DB
}

func NewUserDAO() *UserDAO {
	return &UserDAO{
		db: config.DB,
	}
}

func (dao *UserDAO) GetUserByEmail(email string) (*models.User, error) {
	var user models.User
	if err := dao.db.
		Preload("Department").
		Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (dao *UserDAO) UpdateUser(user *models.User) error {
	if err := dao.db.Save(user).Error; err != nil {
		return err
	}
	return nil
}

func (dao *UserDAO) VerifyOTP(email, otp string) (bool, error) {
	var user models.User
	if err := dao.db.Where("email = ?", email).First(&user).Error; err != nil {
		return false, err
	}
	return user.OTP == otp, nil
}
