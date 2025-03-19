version: '3'

services:
  frontend:
    build:
      context: ./frontend 
    ports:
      - "80:80"
    networks:
      - app-network

  backend:
    build:
      context: ./backend
    ports:
      - "8000:8000"
    environment:
      - PYTHONUNBUFFERED=1
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
