spinnerShooter
==============

4 player co-op spinner shoot-em-up for modern browsers

* I purchased 4 spinners for an arcade cabinet I was building
* I realized that there are very few games that use 4 spinners
* I decided to make one
* This may be a mistake


Technology
----------

* I intend to use es201X without transpiration or external library's
    * OffscreenCanvas
        * https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas
        * https://developers.google.com/web/updates/2018/08/offscreen-canvas
    * PointerLock
        * https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API
        * I don't know if browsers support multiple pointers. Investigation needed


Design
------

Some spitball notes

* Single screen
    * HD (1920*1080)
* Co-op
* Simple arcade blaster
* Some enemies require co-operation to takedown
    * Little weak ass chaff
    * Enemy that locks onto a player and faces them, they are immune to bullets from the front. A companion needs to shoot them from behind
    * Indestructible enemies that can only be picked up and thrown away
    * Ultra hard enemies can only be hurt by collaborating players
* Concept of hook/winch to pull items around and into goal
    * Some items are to heavy for a single player
* Shooting a teammate powers up their weapon for short period
* Shield overdrive (kind of like gigawing)
* Specialty concept
    * Each player gets a bonus for being the player to most ...
        * Moved the most blocks = more pull power
        * Kill at short range (shotgun blast)
        * Best accuracy = Powerful shots
        * Move the most = more maneuverability
