package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name         string     `json:"name" gorm:"not null"`
	Email        string     `json:"email" gorm:"unique;not null"`
	Password     string     `json:"password"`
	Role         string     `json:"role" gorm:"default:'user'"`
	Position     string     `json:"position"`
	DepartmentID uint       `json:"-"`
	Department   Department `json:"dept" gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;"`
	OTP          string     `json:"otp" gorm:"size:10"`
}

type Department struct {
	gorm.Model
	Name string `json:"name" gorm:"not null"`
	// Users []User `json:"users" gorm:"foreignKey:DepartmentID"`
}
