<?php

namespace App\Tests;

use App\Controller\DefaultController;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class DefaultTest extends KernelTestCase
{
  public function testLoadApi(): void
  {
    self::bootKernel();
    $container = static::getContainer();
    $defaultController = $container->get(DefaultController::class);
    $result = $defaultController->index();
    $this->assertJsonStringEqualsJsonString(json_encode(['message' => "Hello"]), $result);
  }
}
