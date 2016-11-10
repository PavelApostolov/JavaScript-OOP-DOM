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
        INVALID_BATTLE_PARTICIPANT: 'Battle participants must be ArmyUnit-like!'
    };
 
 
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
            if (typeof(value) !== 'string') {
                throw  new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
            if (value.length < 2 || value.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            if (!/^[a-zA-Z\s]+$/g.test(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
            this._name = value;
        }
 
        get effect() {
            return this._effect;
        }
 
        set effect(value) {
            if (typeof (value) !== 'function') {
                throw new Error('Effect must be a function with 1 parameter!');
            } else if (value.length !== 1) {
                throw new Error('Effect must be a function with 1 parameter!');
            }
 
            this._effect = value;
        }
 
        get manaCost() {
            return this._manaCost;
        }
 
        set manaCost(value) {
            if (value < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
            this._manaCost = value;
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
            if (typeof(value) !== 'string') {
                throw  new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }
            if (value.length < 2 || value.length > 20) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }
            if (!/^[a-zA-Z\s]+$/g.test(value)) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
            this._name = value;
        }
 
        get alignment() {
            return this._alignment;
        }
 
        set alignment(value) {
            if (value.toLowerCase() !== 'good' && value.toLowerCase() !== 'neutral' && value.toLowerCase() !== 'evil') {
                throw new Error('Alignment must be good, neutral or evil!');
            }
            this._alignment = value;
        }
    }
 
    let armyUnitId = 1;
 
    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);
            this.id = armyUnitId;
            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
            armyUnitId += 1;
        }
 
        get damage() {
            return this._damage;
        }
 
        set damage(value) {
            if (value < 0 || value > 100) {
                throw new Error('Damage must be a positive number that is at most 100!');
            }
            this._damage = value;
        }
 
        get health() {
            return this._health;
        }
 
        set health(value) {
            if (value < 0 || value >= 200) {
                throw new Error('Health must be a positive number that is at most 200!');
            }
            this._health = value;
        }
 
        get count() {
            return this._count;
        }
 
        set count(value) {
            if (typeof (value) !== 'number') {
                throw Error('Count must be a positive integer number!');
            } else if (value < 0) {
                throw Error('Count must be a positive integer number!');
            }
            this._count = value;
        }
 
        get speed() {
            return this._speed;
        }
 
        set speed(value) {
            if (value <= 0 || value >= 100) {
                throw new Error('Speed must be a positive number that is at most 100!');
            }
            this._speed = value;
        }
    }
 
    class Commander extends Unit {
        constructor(name, alignment, damage, health, count, speed, mana) {
            super(name, alignment, damage, health, count, speed);
            this.mana = mana;
            this.spellbook = [];
            this.army = [];
        }
 
        get mana() {
            return this._mana;
        }
 
        set mana(value) {
            if (isNaN(value) || Number(value) < 0) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
            this._mana = value;
        }
    }
 
    const battlemanager = {
        commanders: [],
        getCommander(name, alignment, mana) {
            return new Commander(name, alignment, 0, 0, 0, 0, mana);
        },
        getArmyUnit(options) {
            return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
        },
        getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        },
        addCommanders(params) {
            for (let i = 0; i < arguments.length; i += 1) {
                this.commanders.push(arguments[i]);
            }
            return this;
        },
        addArmyUnitTo(commanderName, armyUnit) {
            let commander = this.commanders.find(c => c.name === commanderName);
            if (commander !== undefined) {
                commander.army.push(armyUnit);
            }
            return this;
        },
        addSpellsTo(commanderName, spell1, spell2, spell3) {
            let commander = this.commanders.find(c => c.name === commanderName),
                spellsToAdd = Array.from(arguments).splice(1, arguments.length - 1);
 
            if (commander !== undefined) {
                spellsToAdd.forEach(sp => {
                    if (!sp.name || !sp.manaCost || !sp.effect) {
                        throw new Error('Passed objects must be Spell-like objects!')
                    }
                });
                spellsToAdd.forEach(sp => {
                    let value = sp.name;
                    if (typeof(value) !== 'string') {
                        throw  new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    }
                    if (value.length < 2 || value.length > 20) {
                        throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    }
                    if (!/^[a-zA-Z\s]+$/g.test(value)) {
                        throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    }
                    if (sp.manaCost < 0) {
                        throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    }
                    /* if (typeof(sp.effect) !== 'function') {
                        throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    } else if (typeof(sp.effect)) {
                        throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
                    } */
                });
                spellsToAdd.forEach(sp => commander.spellbook.push(sp));
                return this;
            } else {
                throw new Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            }
        },
        findCommanders(query) {
            let keys = Object.keys(query),
                result = [];
 
            this.commanders.forEach(c => {
                let isValid = true;
                for (let i = 0; i < keys.length; i += 1) {
                    let key = keys[i];
                    if (c[key] !== query[key]) {
                        isValid = false;
                        break;
                    }
                }
                if (isValid) {
                    result.push(c);
                }
            });
            return result.sort((a, b) => {
                if (a.name > b.name) {
                    return 1;
                } else if (a.name < b.name) {
                    return -1;
                } else {
                    return 0;
                }
            });
        },
        findArmyUnitById(id) {
            for (let i = 0; i < this.commanders.length; i += 1) {
                let currentCommander = this.commanders[i];
 
                for (let j = 0; j < currentCommander.army.length; j += 1) {
                    let unit = currentCommander.army[j];
                    if (unit.id === id) {
                        return unit;
                    }
                }
            }
            return undefined;
        },
        findArmyUnits(query) {
            let keys = Object.keys(query),
                found = [];
 
            for (let i = 0; i < this.commanders.length; i += 1) {
                let currentCommander = this.commanders[i];
                for (let unit of currentCommander.army) {
                    let isValid = true;
                    for (let j = 0; j < keys.length; j += 1) {
                        let key = keys[j];
                        let unitValue = unit[key];
                        let queryValue = query[key];
                        if (unit[key] !== query[key]) {
                            isValid = false;
                            break;
                        }
                    }
 
                    if (isValid) {
                        found.push(unit);
                    }
                }
            }
 
            let result = found.sort((a, b) => {
                if (a.speed === b.speed) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }
                    return 0;
                }
                return b.speed - a.speed;
            });
            return result;
        },
        spellcast(casterName, spellName, targetUnitId) {
            let commander = this.commanders.find(c => c.name === casterName);
            if (commander === undefined) {
                throw new Error("Cannot cast with non-existant commander " + casterName);
            }
 
            let effect,
                cost;
            for (let i = 0; i < commander.spellbook.length; i += 1) {
                let currentSpell = commander.spellbook[i];
                if (currentSpell.name === spellName) {
                    effect = currentSpell.effect;
                    cost = currentSpell.manaCost;
                    break;
                }
            }
 
            if (effect == undefined) {
                throw new Error(casterName + " does not know " + spellName);
            }
 
            if (cost > commander.mana) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }
 
            commander.mana -= cost;
            let armyUnit;
            this.commanders.forEach(c => {
                for (let i = 0; i < c.army.length; i += 1) {
                    let unit = c.army[i];
                    if (unit.id === targetUnitId) {
                        armyUnit = unit;
                        break;
                    }
                }
            });
 
            if (armyUnit === undefined) {
                throw new Error('Target not found!');
            }
 
            effect(armyUnit);
            return this;
        },
        battle(attacker, defender) {
            if (!attacker.damage || !attacker.health || !attacker.count) {
                throw new Error('Battle participants must be ArmyUnit-like!');
            }
 
            if (!defender.damage || !defender.health || !defender.count) {
                throw new Error('Battle participants must be ArmyUnit-like!');
            }
 
            attacker.totalDamage = attacker.count * attacker.damage;
            defender.totalHealth = defender.health * defender.count;
            defender.totalHealth -= attacker.totalDamage;
            let newCount = Math.ceil(defender.totalHealth / defender.health);
            if (newCount < 0) {
                defender.count = 0;
            } else {
                defender.count = newCount;
            }
            return this;
        }
    };
 
    return battlemanager;

    }
