<?php

namespace Database\Factories;

use App\Models\Unicorn;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnicornFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Unicorn::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $i = random_int(-6, 4);
        $uid = $i;
        if($i < 0){
            $uid = null;
        }
        return [
            'name' => $this->faker->name,
            'user_id' => $uid,
        ];
    }
}
