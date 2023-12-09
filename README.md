spinnerShooter
==============

4 player co-op spinner shoot-em-up for modern browsers

* I purchased 4 spinners for an arcade cabinet I was building
* I realized that there are very few games that use 4 spinners
* I decided to make one


Technology
----------

* I intend to use es202X without transpiration or external library's
    * (Canvas)[https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial]
    * OffscreenCanvas
        * https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
        * https://developers.google.com/web/updates/2018/08/offscreen-canvas
    * PointerLock
        * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events
        * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
        * I don't know if browsers support multiple pointers. Investigation needed
    * TODO:
        * It may be possible to access 4 spinners with the new WebHID API
            * https://web.dev/hid-examples/

* WebGL 120fps?
    * https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API
    * https://web.dev/articles/webgl-fundamentals


Design
------

Some spitball notes

* Single screen
    * HD (1920*1080)? maybe 4k? 
    * Cocktail? Maybe the screen is laid flat on the table and each player sees the screen from a different orientation
* Co-op
* Simple arcade blaster
* Some enemies require co-operation to takedown
    * Little weak ass chaff
    * Enemy that locks onto a player and faces them, they are immune to bullets from the front. A companion needs to shoot them from behind
    * Indestructible enemies that can only be picked up and thrown away
    * Ultra hard enemies can only be hurt by collaborating players
        * Power up shot (player shooting another player to power up their shots)
        * 3 players forming a triangle
* Concept of hook/winch to pull items around and into goal
    * Some items are to heavy for a single player
* Flame jets can burn growing plant enimies?
* Ships can dock in cannons and shiled generators
* Shooting a teammate powers up their weapon for short period
* Shield overdrive (kind of like gigawing)
    * Can be used to heal other players?
* Bullets can be curved with ship orientation (e.g atari 2600 combat)
* joystick controls 4 way jets - 
* rotation is jet based - movement can be unbalanced by gunk on jets
* Specialty concept
    * Each player gets a bonus for being the player to most ...
        * Moved the most blocks = more pull power
        * Kill at short range (shotgun blast)
        * Best accuracy = Powerful shots
        * Move the most = more maneuverability
* Game is the menu - position of ships select mode (like Blastroids?)