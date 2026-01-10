#!/bin/bash
echo "Enter your username : "
read username

echo "Enter your comapny name : "
read company

echo "Enter your pin : "
read pin

if [ "$username" = "John" ] && [ "$company" = "Tryhackme" ] && [ "$pin" = "7385" ]; then
    echo "Access granted"
else
    echo "Access denied"
fi
    