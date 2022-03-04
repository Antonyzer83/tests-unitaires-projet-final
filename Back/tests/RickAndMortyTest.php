<?php

namespace App\Tests;

use App\Entity\Cart;
use App\Entity\Product;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use App\Service\RickAndMortyGestion;

class RickAndMortyTest extends KernelTestCase
{
  public function testAddProductToCart(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $product = new Product(1);
    $product->setName('Rick Sanchez');
    $product->setPrice('9,99');
    $product->setQuantity(2);
    $product->setImage('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
    $result = $rickAndMortyService->addProductToCart($product, 2);
    $this->assertInstanceOf(Cart::class, $result);
  }

  public function testAddProductToCartWithTooQuantity(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $product = new Product(1);
    $product->setName('Rick Sanchez');
    $product->setPrice('9,99');
    $product->setQuantity(2);
    $product->setImage('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
    try {
      $rickAndMortyService->addProductToCart($product, 10);
    } catch (\Exception $e) {
      $this->assertEquals('too quantity', $e->getMessage());
    }
  }

  public function testFindById(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $result = $rickAndMortyService->findById(1);
    $this->assertIsArray($result);
  }

  public function testFindCart(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $result = $rickAndMortyService->findCart();
    $this->assertInstanceOf(Cart::class, $result);
  }

  public function testFindAll(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $result = $rickAndMortyService->findAll();
    $this->assertIsArray($result);
  }

  public function testDeleteProductFromCart(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyService = $container->get(RickAndMortyGestion::class);
    $product = new Product();
    $product->setName('Rick Sanchez');
    $product->setPrice('9,99');
    $product->setQuantity(2);
    $product->setImage('https://rickandmortyapi.com/api/character/avatar/1.jpeg');
    $result = $rickAndMortyService->deleteProductFromCart($product);
    $this->assertInstanceOf(Cart::class, $result);
  }
}
