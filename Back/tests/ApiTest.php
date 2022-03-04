<?php

namespace App\Tests;

use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;

class ApiTest extends WebTestCase
{
    public function testHome(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['message' => "Hello world"], $responseData);
    }

    public function testProductsIndex(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertIsArray($responseData);
    }

    public function testProductShow(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/products/1');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('id', $responseData);
        $this->assertArrayHasKey('image', $responseData);
        $this->assertArrayHasKey('name', $responseData);
    }

    public function testCartStoreProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('POST', '/api/cart/1', array(
            'quantity' => 2
        ));
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('id', $responseData);
        $this->assertArrayHasKey('products', $responseData);
    }

    public function testCartStoreProductWithException(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('POST', '/api/cart/1', array(
            'quantity' => 100
        ));
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertEquals(['error' => 'too many'], $responseData);
    }

    public function testCartShow(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('GET', '/api/cart');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertArrayHasKey('id', $responseData);
        $this->assertArrayHasKey('products', $responseData);
    }

    public function testCartRemoveProduct(): void
    {
        $client = static::createClient();
        // Request a specific page
        $client->jsonRequest('DELETE', '/api/cart/1');
        $response = $client->getResponse();
        $this->assertResponseIsSuccessful();
        $this->assertJson($response->getContent());
        $responseData = json_decode($response->getContent(), true);
        $this->assertNotContainsEquals(array(
            'id' => 1,
            'name' => 'Rick Sanchez',
            'price' => '9,99',
            'quantity' => 2,
            'image' => 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        ), $responseData);
    }
}
