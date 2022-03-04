<?php

namespace App\DataFixtures;

use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Product;
use App\Service\RickAndMortyApiService;



class AppFixtures extends Fixture
{
    private RickAndMortyApiService $rickAndMortyService;
    private $prices = "9,99";
    private $quantites = 2;

    public function __construct(RickAndMortyApiService $rickAndMortyService)
    {
        $this->rickAndMortyService = $rickAndMortyService;
    }

    public function load(ObjectManager $manager): bool
    {
        $data = $this->rickAndMortyService->loadApi();
        foreach ($data as $model) {
            $product = new Product();
            $product->setName($model->getName());
            $product->setPrice($this->prices);
            $product->setQuantity($this->quantites);
            $product->setImage($model->getImage());
            $manager->persist($product);
        }

        $manager->flush();

        return true;
    }
}
