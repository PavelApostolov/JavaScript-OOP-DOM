function solve() {
    'use strict';

    function mySort(a, b) {
        if (a > b) {
            return 1;
        }
        else if (a < b) {
            return -1;
        }
        else {
            return 0;
        }
    }

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };

    let currentArmyUnitId = 0;

    class Validator {
        static checkName(name) {
            if (typeof name !== 'string') {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            if (name.length < 2 || name.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }

            let names = name.split(' ');
            for (let name of names) {
                if (!(/^[a-zA-Z]+$/.test(name))) {
                    throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
                }
            }
        }

        static checkNumber(value, min, max) {
            if (typeof value !== 'number') {
                return false;
            }

            if (isNaN(value)) {
                return false;
            }

            min = min || -Math.max;
            max = max || Math.max;

            if (value < min || value > max) {
                return false;
            }

            return true;
        }

        static checkEffect(effect) {
            if (typeof effect !== 'function' || effect.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        }

        static checkAlignment(alignment) {
            if (alignment !== 'good' && alignment !== 'neutral' && alignment !== 'evil') {
                throw new Error('Alignment must be good, neutral or evil!');
            }
        }
    }

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.checkName(value);
            this._name = value;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(value) {
            if (Validator.checkNumber(value, 1)) {
                this._manaCost = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        }

        get effect() {
            return this._effect;
        }

        set effect(value) {
            Validator.checkEffect(value);
            this._effect = value;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            Validator.checkName(value);
            this._name = value;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(value) {
            Validator.checkAlignment(value);
            this._alignment = value;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);
            this.id = ++currentArmyUnitId;
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get damage() {
            return this._damage;
        }

        set damage(value) {
            if (Validator.checkNumber(value, 1, 100)) {
                this._damage = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }
        }

        get health() {
            return this._health;
        }

        set health(value) {
            if (Validator.checkNumber(value, 1, 200)) {
                this._health = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }
        }

        get count() {
            return this._count;
        }

        set count(value) {
            if (Validator.checkNumber(value, 0)) {
                this._count = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            if (Validator.checkNumber(value, 1, 100)) {
                this._speed = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana) {
            super(name, alignment);
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }

        get mana() {
            return this._mana;
        }

        set mana(value) {
            if (Validator.checkNumber(value, 1)) {
                this._mana = value;
            }
            else {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        }
    }

    class battlemanager {
        constructor() {
            this.commanders = [];
        }

        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        }

        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }

        getArmyUnit(options) {
            return new ArmyUnit(
                options.name,
                options.alignment,
                options.damage,
                options.health,
                options.count,
                options.speed
            );
        }

        addCommanders(...commanders) {
            for (let commander of commanders) {
                this.commanders.push(commander);
            }

            return this;
        }

        addArmyUnitTo(commanderName, armyUnit) {
            let commanderIndex = this.commanders.findIndex(c => c.name === commanderName);
            this.commanders[commanderIndex].army.push(armyUnit);
            return this;
        }

        addSpellsTo(commanderName, ...spells) {
            let commanderIndex = this.commanders.findIndex(c => c.name === commanderName);

            var fakeSpell = spells.find(s => !(s instanceof Spell));

            if (fakeSpell) {
                throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            }

            for (let spell of spells) {
                this.commanders[commanderIndex].spellbook.push(spell);
            }

            return this;
        }

        findCommanders(query) {
            let commanders = [];

            for (let commander of this.commanders) {
                let isEqual = true;

                for (let prop in query) {
                    let queryProperty = query[prop],
                        commanderProperty = commander[prop];

                    if (queryProperty !== commanderProperty) {
                        isEqual = false;
                    }
                }

                if (isEqual) {
                    commanders.push(commander);
                }
            }

            return commanders.sort();
        }

        findArmyUnitById(id) {
            for (let commander of this.commanders) {
                for (let unit of commander.army) {
                    if (unit.id === id) {
                        return unit;
                    }
                }
            }

            return undefined;
        }

        findArmyUnits(query) {
            let units = [];
            for (let commander of this.commanders) {
                for (let unit of commander.army) {
                    let isEqual = true;

                    for (let prop in query) {
                        let queryProperty = query[prop],
                            unitProperty = unit[prop];

                        if (queryProperty !== unitProperty) {
                            isEqual = false;
                        }
                    }

                    if (isEqual) {
                        units.push(unit);
                    }
                }
            }

            return units.sort((a, b) => mySort(b.speed, a.speed) || mySort(a.name, b.name));
        }

        spellcast(casterName, spellName, targetUnitId) {
            let commander = this.findCommanders({ name: casterName })[0],
                spell,
                unit;

            if (!commander) {
                throw new Error(' Cannot cast with non-existant commander ' + casterName);
            }

            spell = commander.spellbook.find(s => s.name === spellName);

            if (!spell) {
                throw new Error(casterName + ' does not know ' + spellName);
            }

            if (spell.manaCost > commander.mana) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }

            unit = this.findArmyUnitById(targetUnitId);

            if (!unit) {
                throw new Errro(ERROR_MESSAGES.TARGET_NOT_FOUND);
            }

            spell.effect(unit);
            commander.mana -= spell.manaCost;

            return this;
        }

        battle(attacker, defender) {
            if (!(attacker instanceof ArmyUnit) || !(defender instanceof ArmyUnit)) {
                throw new Error('Battle participants must be ArmyUnit-like!');
            }

            let attackerTotalDamage = attacker.damage * attacker.count,
                defenderTotalHealth = defender.health * defender.count;

            defenderTotalHealth -= attackerTotalDamage;

            let count = defenderTotalHealth / defender.health;

            if (count > 0) {
                count = Math.round(count + 0.3);
            }
            else {
                count = 0;
            }

            defender.count = count;

            return this;
        }
    }

    return new battlemanager();
}

module.exports = solve;

////////////////

function solve() {
    'use strict';

    const ERROR_MESSAGES = {
        INVALID_NAME_TYPE: 'Name must be string!',
        INVALID_NAME_LENGTH: 'Name must be between between 2 and 20 symbols long!',
        INVALID_NAME_SYMBOLS: 'Name can contain only latin symbols and whitespaces!',
        INVALID_MANA: 'Mana must be a positive integer number!',
        INVALID_EFFECT: 'Effect must be a function with 1 parameter!',
        INVALID_DAMAGE: 'Damage must be a positive number that is at most 100!',
        INVALID_HEALTH: 'Health must be a positive number that is at most 200!',
        INVALID_SPEED: 'Speed must be a positive number that is at most 100!',
        INVALID_COUNT: 'Count must be a positive integer number!',
        INVALID_SPELL_OBJECT: 'Passed objects must be Spell-like objects!',
        NOT_ENOUGH_MANA: 'Not enough mana!',
        TARGET_NOT_FOUND: 'Target not found!',
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!',
        INVALID_ALIGNMENT: 'Alignment must be good, neutral or evil!'
    };

    // your implementation goes here

    const SPELL_NAME_PATTERN = /^[A-Za-z\s]*$/;

    const validator = (() => {
        const SPELL_NAME_PATTERN = /^[A-Za-z\s]*$/;
        return {
            validateName(value) {
                if (typeof value !== 'string') {
                    throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
                }

                if (!SPELL_NAME_PATTERN.test(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
                }

                if (!(2 <= value.length && value.length <= 20)) {
                    throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
                }
            }
        }
    })();

    function* IdGenerator() {
        let last = 0;
        while (true) {
            yield last += 1;
        }
    }

    class Spell {
        constructor(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            // if (typeof value !== 'string') {
            //     throw new Error(INVALID_NAME_TYPE);
            // }

            // if (!SPELL_NAME_PATTERN.test(value)) {
            //     throw new Error(INVALID_NAME_SYMBOLS);
            // }

            // if (!(2 <= value.length && value.length <= 20)) {
            //     throw new Error(INVALID_NAME_LENGTH);
            // }
            validator.validateName(value);

            this._name = value;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            if ((value | 0) !== value) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            this._manaCost = value;
        }

        get effect() {
            return this._effect;
        }

        set effect(value) {
            if (value.length !== 1) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
            // !!!
            if (typeof value !== 'function') {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }

            this._effect = value;
        }
    }

    class Unit {
        constructor(name, alignment) {
            this.name = name;
            this.alignment = alignment;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            validator.validateName(value);

            this._name = value;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(value) {
            const isGood = value === 'good';
            const isNeutral = value === 'neutral';
            const isEvil = value === 'evil';

            if (!isGood && !isNeutral && !isEvil) {
                throw new Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }

            this._alignment = value;
        }
    }

    const armyUnitIdGeneraor = IdGenerator();
    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);
            this.id = armyUnitIdGeneraor.next().value;

            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get damage() {
            return this._damage;
        }

        set damage(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }

            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }

            if (100 < value) {
                throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }

            this._damage = value;
        }

        get health() {
            return this._health;
        }

        set health(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }

            if (value < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }

            if (200 < value) {
                throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
            }

            this._health = value;
        }

        get count() {
            return this._count;
        }

        set count(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }

            if (value < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }

            if ((value | 0) !== value) {
                throw new Error(ERROR_MESSAGES.INVALID_COUNT);
            }

            this._count = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }

            if (value < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }

            if (100 < value) {
                throw new Error(ERROR_MESSAGES.INVALID_SPEED);
            }

            this._speed = value;
        }
    }

    class Commander extends Unit {
        constructor(name, alignment, mana, spellbook, army) {
            super(name, alignment);

            this.mana = mana;
            this.spellbook = spellbook || [];
            this.army = army || [];
        }

        get mana() {
            return this._mana;
        }

        set mana(value) {
            value = Number(value);
            if (isNaN(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            if (value <= 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            if ((value | 0) !== value) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }

            this._mana = value;
        }
    }

    const battlemanager = {
        commanders: [],
        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        },
        getArmyUnit(options) {
            return new ArmyUnit(
                options.name,
                options.alignment,
                options.damage,
                options.health,
                options.count,
                options.speed);
        },
        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        },
        addCommanders(...input) {
            battlemanager.commanders.push(...input);
            return this;
        },
        addArmyUnitTo(commanderName, armyUnit) {
            const commander = battlemanager.commanders.find(item => {
                return item.name === commanderName;
            });

            commander.army.push(armyUnit);
            return this;
        },
        addSpellsTo(commanderName, ...spells) {
            const commander = battlemanager.commanders.find(item => {
                return item.name === commanderName;
            });

            spells.forEach(item => {
                validateSpell(item);
                // if (!item.name || !item.manaCost || !item.effect) {
                //     throw new Error("Passed objects must be Spell-like objects!");
                // }

                // try {
                //     new Spell(item.name, item.manaCost, item.effect);
                // } catch (e) {
                //     throw new Error("Passed objects must be Spell-like objects!");
                // }

            });

            commander.spellbook.push(...spells);

            function validateSpell(spell) {
                if (spell === undefined) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (spell === null) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                let value = spell.name;
                if (typeof value !== 'string') {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (!SPELL_NAME_PATTERN.test(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (!(2 <= value.length && value.length <= 20)) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                value = Number(spell.manaCost);
                if (isNaN(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (value <= 0) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (Math.floor(value) !== value) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                value = spell.effect;
                if (typeof value !== 'function') {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }

                if (value.length !== 1) {
                    throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                }
                // !!!

            }

            return this;
        },
        findCommanders(query) {
            const matches = battlemanager.commanders.filter(item => {
                if (query.name && item.name !== query.name) {
                    return false;
                }

                if (query.alignment && item.alignment !== query.alignment) {
                    return false;
                }

                return true;
            });

            matches.sort();

            return matches;
        },
        findArmyUnitById(id) {
            let unit;
            battlemanager.commanders.forEach(comm => {
                comm.army.forEach(u => {
                    if (u.id === id) {
                        unit = u;
                    }
                });
            });

            return unit;
        },
        findArmyUnits(query) {
            let units = [];

            battlemanager.commanders.forEach(comm => {
                comm.army.forEach(item => {
                    if (query.id && item.id !== query.name) {
                        return false;
                    }

                    if (query.name && item.name !== query.name) {
                        return false;
                    }

                    if (query.alignment && item.alignment !== query.alignment) {
                        return false;
                    }

                    units.push(item);
                });
            });

            units.sort((a, b) => {
                const compareSpeed = b.speed - a.speed;
                if (compareSpeed !== 0) {
                    return compareSpeed;
                }

                return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
            });

            return units;
        },
        spellcast(casterName, spellName, targetUnitId) {
            const commander = battlemanager.commanders.find(comm => comm.name === casterName);
            if (!commander) {
                throw new Error('Cannot cast with non-existant commander ' + casterName + '!');
            }

            const spell = commander.spellbook.find(spel => spel.name === spellName);
            if (!spell) {
                throw new Error(casterName + ' does not know ' + spellName);
            }

            targetUnitId = Number(targetUnitId);
            if (isNaN(targetUnitId)) {
                throw new Error('Target not found!');
            }

            let unit;
            battlemanager.commanders.forEach(comm => {
                comm.army.forEach(u => {
                    if (u.id === targetUnitId) {
                        unit = u;
                    }
                });
            });

            if (!unit) {
                throw new Error('Target not found!');
            }

            if (commander.mana < spell.manaCost) {
                throw new Error('Not enough mana!');
            }
// [].forEach.call()
            spell.effect.call(unit, unit);
            commander.mana -= spell.manaCost;
            return this;
        },
        battle(attacker, defender) {
            try {
                validateUnit(attacker);
                validateUnit(defender);
            } catch (e) {
                throw new Error('Battle participants must be ArmyUnit-like!');
            }

            const attackerTotalDamage = attacker.count * attacker.damage;
            const defenterTotalHealth = defender.count * defender.health;

            const defenderHealthRemaining = defenterTotalHealth - attackerTotalDamage;
            let newCount = Math.ceil(defenderHealthRemaining / defender.health);

            if (newCount < 0) {
                defender.count = 0;
            } else {
                defender.count = newCount;
            }

            function validateUnit(unit) {
                let value = Number(unit.damage);
                if (isNaN(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
                }

                if (value <= 0) {
                    throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
                }

                if (100 < value) {
                    throw new Error(ERROR_MESSAGES.INVALID_DAMAGE);
                }

                value = Number(unit.health);
                if (isNaN(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
                }

                if (value < 0) {
                    throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
                }

                if (200 < value) {
                    throw new Error(ERROR_MESSAGES.INVALID_HEALTH);
                }

                value = Number(unit.count);
                if (isNaN(value)) {
                    throw new Error(ERROR_MESSAGES.INVALID_COUNT);
                }

                if (value < 0) {
                    throw new Error(ERROR_MESSAGES.INVALID_COUNT);
                }

                if ((value | 0) !== value) {
                    throw new Error(ERROR_MESSAGES.INVALID_COUNT);
                }
            }

            return this;
        }
    };

    return battlemanager;
}

module.exports = solve;