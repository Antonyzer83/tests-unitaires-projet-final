![Node CI Badge](https://github.com/Antonyzer83/tests-unitaires-projet-final/workflows/Node%20CI/badge.svg)

![PHP CI Badge](https://github.com/Antonyzer83/tests-unitaires-projet-final/workflows/PHP%20CI/badge.svg)

# Start projet

```bash
# Backend part
cd Back
docker-compose up -d
docker exec -it php-app bash
composer install
php bin/console doctrine:database:create
php bin/console doctrine:migration:migrate -n

# Frontend part
cd Frontend
npm install
npm start
```

# Run Backend tests

```bash
# Prerequires
cd Back
docker exec -it php-app bash

# First option
php bin/phpunit
# Second option
XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-html=out/
```

# Run Frontend tests

```bash
# Prerequires
cd Front
# First option
npm test
# Second option
npm test -- --coverage
```
