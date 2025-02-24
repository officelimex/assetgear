package models

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtSecret = []byte("your_secret_key")

// GenerateJWT generates a JWT token for a user
func GenerateJWT(user User) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.ID,
		"role":   user.Role,
		"name":   user.Name,
		"did":    user.DepartmentID,
		"dept":   user.Department.Name,
		"exp":    time.Now().Add(time.Hour * 24).Unix(), // Expires in 24 hours
	})

	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}
