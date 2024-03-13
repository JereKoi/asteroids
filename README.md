# asteroids
Javascript and HTML asteroids game

This project is a beginner-friendly implementation of an asteroids game from 1979 Atari using HTML canvas and JavaScript. Let's break down the main components and concepts utilized:

1. Canvas Setup: The HTML canvas element is selected, and its 2D context is obtained for drawing graphics. The canvas dimensions are set to match the inner dimensions of the browser window.

2. Player Class: Represents the player's spaceship. It handles drawing the player's ship, updating its position based on velocity, and managing its rotation. The ship is drawn as a triangle with a circle representing its center.

3. Projectile Class: Represents the projectiles fired by the player's ship. Similar to the player class, it handles drawing and updating the projectile's position based on velocity.

4. Asteroid Class: Represents the asteroids moving across the screen. Like the player and projectile classes, it handles drawing and updating the asteroid's position.

5. Game Loop (Animate Function): Utilizes the `requestAnimationFrame` method to continuously update the game state and redraw the canvas. It updates the player, projectiles, and asteroids, checks for collisions, and manages user input.

6. Collision Detection: Two collision detection functions are defined - `circleCollision` for detecting collisions between circles (used for projectiles hitting asteroids), and `circleTriangleCollision` for detecting collisions between the player's ship (triangle) and asteroids (circles).

7. Input Handling: Event listeners are added for keydown and keyup events to handle player input for movement (W, A, D keys) and shooting projectiles (Space key).

Main Takeaways:

1. Understanding Game Loop: The concept of a game loop is crucial for any real-time application development, including web-based games. It ensures continuous rendering and updating of game objects.

2. Canvas Drawing: This project demonstrates how to draw shapes and apply transformations on an HTML canvas. These skills are transferable to various web development scenarios involving custom graphics and animations.

3. Object-Oriented Programming (OOP): The project uses classes to encapsulate related functionality (player, projectile, asteroid), promoting code organization and reusability.

4. Collision Detection: Implementing collision detection is a fundamental aspect of game development. This project covers basic collision detection techniques applicable to many types of games.

5. Event Handling: Understanding how to handle user input events (keydown, keyup) is essential for interactive web applications beyond games.

To utilize this knowledge in web development, you can expand upon this project by adding more features such as:

- Scorekeeping
- Multiple levels with increasing difficulty
- Sound effects
- Power-ups
- Different types of asteroids with varying behaviors
- Split bigger asteroids to smaller asteroids when hit by projectile
- Game over screen
- Start screen
- Angles from which asteroids come from. Ones which could come from corner of the screen

Overall, this project provides a solid foundation for understanding game development concepts and applying them in web development scenarios. It's beginner-friendly and offers practical insights into building interactive applications using HTML canvas and JavaScript.
