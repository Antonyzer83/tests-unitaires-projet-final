<?php

namespace App\Tests;

use App\Model\RickAndMortyModel;
use App\Service\RickAndMortyApiService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class RickAndMortyApiTest extends KernelTestCase
{
  public function testLoadApi(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $rickAndMortyApiService = $container->get(RickAndMortyApiService::class);
    $result = $rickAndMortyApiService->loadApi();
    $this->assertIsArray($result);
  }
}
