//Solution Cuki
function solve() {
	function* getId() {
		let id = 0;

		while(true) {
			id += 1;
			yield id;
		}
	}

	const idGenerator = getId();

	const Validator = {
		validateString(str, name) {
			if(typeof str !== 'string') {
				throw Error(`${name} is not a string`);
			}
		},
		validateLength2_20(str, name) {
			if(str.length < 2 || str.length > 20) {
				throw Error(`${name} must be between between 2 and 20 symbols long!`);
			}
		},
		validateOnlyLatin(str, name) {
			if(str.match(/[^a-zA-Z ]/)) {
				throw Error(`${name} can contain only latin symbols!`);
			}
		},

		validatePositiveInteger(num, name) {
			if(typeof num !== 'number' || !(num > 0) || num !== (num | 0)) {
				throw Error(`${name} must be a positive integer number!`);
			}
		},
		validatePositiveBelow(num, name, upperBound) {
			if(typeof num !== 'number' || !(num >= 0 && num <= upperBound)) {
				throw Error(`${name} must be a positive number below ${upperBound}!`)
			}
		},

		validateAlignment(alignment, name) {
			if(alignment !== 'good' && alignment !== 'neutral' && alignment !== 'evil') {
				throw Error(`${name} must be good, neutral or evil!`);
			}
		}
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
		set name(name) {
			Validator.validateString(name, 'Name');
			Validator.validateLength2_20(name, 'Name');
			Validator.validateOnlyLatin(name, 'Name');

			this._name = name;
		}

		get manaCost() {
			return this._manaCost;
		}
		set manaCost(manaCost) {
			Validator.validatePositiveInteger(manaCost, 'Mana');

			this._manaCost = manaCost;
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
		set name(name) {
			Validator.validateString(name, 'Name');
			Validator.validateLength2_20(name, 'Name');
			Validator.validateOnlyLatin(name, 'Name');

			this._name = name;
		}

		get alignment() {
			return this._alignment;
		}
		set alignment(alignment) {
			Validator.validateAlignment(alignment, 'Alignment');

			this._alignment = alignment;
		}
	}

	class ArmyUnit extends Unit {
		constructor(name, alignment, damage, health, count, speed) {
			super(name, alignment);

			this._id = idGenerator.next().value;
			this.damage = damage;
			this.health = health;
			this.count = count;
			this.speed = speed;
		}

		get id() {
			return this._id;
		}

		get damage() {
			return this._damage;
		}
		set damage(damage) {
			Validator.validatePositiveBelow(damage, 'Damage', 100);

			this._damage = damage;
		}

		get health() {
			return this._health;
		}
		set health(health) {
			Validator.validatePositiveBelow(health, 'Health', 100);

			this._health = health;
		}

		get count() {
			return this._count;
		}
		set count(count) {
			Validator.validatePositiveInteger(count, 'Count');

			this._count = count;
		}

		get speed() {
			return this._speed;
		}
		set speed(speed) {
			Validator.validatePositiveBelow(speed, 'Speed', 100);

			this._speed = speed;
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
		set mana(mana) {
			Validator.validatePositiveInteger(mana, 'Mana');

			this._mana = mana;
		}
	}

	class BattleManager {
		constructor() {
			this._commanders = [];
			this._army_units = [];
		}

		getCommander(name, alignment, mana) {
			return new Commander(name, alignment, mana);
		}

		getArmyUnit(options) {
			return new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);
		}

		getSpell(name, manaCost, effect) {
			return new Spell(name, manaCost, effect);
		}

		addCommanders(...commanders) {
			this._commanders.push(...commanders);
			return this;
		}

		addSpellsTo(commanderName, ...spells) {
			let commander = this._commanders.find(commander => commander.name === commanderName);
			if(commander === undefined) {
				throw Error(`No such commander`);
			}

			commander.spellbook.push(...spells);
			return this;
		}

		addArmyUnitTo(commanderName, armyUnit) {
			let commander = this._commanders.find(commander => commander.name === commanderName);
			if(commander === undefined) {
				throw Error(`No such commander`);
			}

			commander.army.push(armyUnit);
			this._army_units.push(armyUnit);
			return this;
		}

		spellcast(casterName, spellName, targetUnitId) {
			let commander = this._commanders.find(commander => commander.name === casterName);
			if(commander === undefined) {
				throw Error(`Can't cast with non-existant Commander`);
			}

			let spell = commander.spellbook.find(spell => spell.name === spellName);
			if(spell === undefined) {
				throw Error(`${commanderName} doesn't know ${spellName}`);
			}
			if(commander.mana < spell.manaCost) {
				throw Error(`Not enough mana!`);
			}

			if(this._army_units.find(unit => unit.id === targetUnitId) === undefined) {
				throw Error(`Target not found!`);
			}

			commander.mana -= spell.manaCost;
			spell.effect(targetUnitId);

			return this;
		}

		findCommanders(query) {
			return this._commanders
				.filter(commander => Object.keys(query).every(prop => query[prop] === commander[prop]));
		}

		findArmyUnitById(id) {
			return this._army_units.find(unit => unit.id === id);
		}

		findArmyUnits(query) {
			return this._army_units
				.filter(unit => Object.keys(query).every(prop => query[prop] === unit[prop]));
		}

		battle(attacker, defender) {
			// still not clear what to do here
			let totalDamage = attacker.damage * attacker.count;
			let totalHealth = defender.health * defender.count;
			totalHealth -= totalDamage;
			defender.count = Math.ceil(totalHealth / defender.health);

			if(defender.count < 0) {
				defender.count = 0;
			}
			
			return this;
		}
	}

	return new BattleManager;
}

module.exports = solve;

//Solution Author
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

    const validator = {
        validateName(name) {
            const invalidType = typeof name !== 'string';
                
            if(invalidType) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            validator.validateRange(name.length, 2, 20, ERROR_MESSAGES.INVALID_NAME_LENGTH);

            const invalidSymbols = /[^a-zA-Z ]/.test(name);

            if(invalidSymbols) {
                throw new Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }
        },
        validateMana(manaValue) {
            const invalidType = isNaN(manaValue),
                invalidRange = manaValue < 0;

            if (invalidType || invalidRange) {
                throw new Error(ERROR_MESSAGES.INVALID_MANA);
            }
        },
        validateAlignment(alignment) {
            const invalidAlignment = ['good', 'neutral', 'evil'].indexOf(alignment) === -1;

            if (invalidAlignment) {
                throw new Error(ERROR_MESSAGES.INVALID_ALIGNMENT);
            }
        },
        validateRange(value, min, max, message) {
            
            if ((value < min) || (max < value)) {
                throw new Error(message);
            }
        },
        validateEffect(effect) {
            const invalidType = typeof effect !== 'function';

            if (invalidType || (effect.length !== 1)) {
                throw new Error(ERROR_MESSAGES.INVALID_EFFECT);
            }
        },
        validateNonNull(value, message) {
            if (value == null) {
                throw new Error(message);
            }
        },
        validateCastManaCost(mana, manaCost) {
            if (mana < manaCost) {
                throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }
        },
        validateBattleUnit(unit, message) {
            const invalidDamage = isNaN(unit.damage),
                invalidHealth = isNaN(unit.health),
                invalidCount = isNaN(unit.count);

            if(invalidDamage || invalidCount || invalidHealth) {
                throw new Error(message);
            }
        }
    };

    function *getIdGenerator() {
        let id = 0;

		while(true) {
			id += 1;
			yield id;
		}
    }

    const idGenerator = getIdGenerator();

    const spell = {
        get name() {
            return this._name;
        },
        set name(value) {
            validator.validateName(value);

            this._name = value;
        },
        get manaCost() {
            return this._manaCost;
        },
        set manaCost(value) {
            validator.validateMana(value);
            this._manaCost = value;
        },
        get effect() {
            return this._effect;
        },
        set effect(value) {
            validator.validateEffect(value);

            this._effect = value;
        },
        init(name, manaCost, effect) {
            this.name = name;
            this.manaCost = manaCost;
            this.effect = effect;

            return this;
        }
    };

    const unit = {
        get name() {
            return this._name;
        },
        set name(value) {
            validator.validateName(value);
            this._name = value;
        },
        get alignment() {
            return this._alignment;
        },
        set alignment(value) {
            validator.validateAlignment(value);
            this._alignment = value;
        },
        init(name, alignment) {
            this.name = name;
            this.alignment = alignment;

            return this;
        }
    };

    const armyUnit = (function (parent) {
        const armyUnit = Object.create(parent);

        Object.defineProperties(armyUnit, {
            id: {
                get () {
                    return this._id;
                }
            },
            count: {
                get () {
                    return this._count;
                },
                set (value) {
                    validator.validateRange(value, 0, Infinity, ERROR_MESSAGES.INVALID_COUNT);
                    this._count = value;
                }
            },
            speed: {
                get () {
                    return this._speed;
                },
                set (value) {
                    validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_SPEED);
                    this._speed = value;
                }
            },
            damage: {
                get () {
                    return this._damage;
                },
                set (value) {
                    validator.validateRange(value, 0, 100, ERROR_MESSAGES.INVALID_DAMAGE);
                    this._damage = value;
                }
            },
            health: {
                get () {
                    return this._health;
                },
                set (value) {
                    validator.validateRange(value, 0, 200, ERROR_MESSAGES.INVALID_HEALTH);

                    this._health = value;
                }
            },
            init: {
                value (name, alignment, damage, health, count, speed) {
                    this.damage = damage;
                    this.health = health;
                    this.count = count;
                    this.speed = speed;
                    this._id = idGenerator.next().value;
                    return parent.init.call(this, name, alignment);
                }
            }
        });

        return armyUnit;
    } (unit));

    const commanderProto = (function (parent) {
        const commander = Object.create(parent);

        Object.defineProperties(commander, {
            mana: {
                get () {
                    return this._mana;
                },
                set (value) {
                    validator.validateMana(value);
                    this._mana = value;
                }
            },
            init: {
                value (name, alignment, mana) {
                    this.mana = mana;
                    this.army = [];
                    this.spellbook = [];
                    return parent.init.call(this, name, alignment);
                }
            }
        });

        return commander;
    } (unit));

    const battlemanager = (function () {

        function meetsRequirements(object, requirements) {

            for (const req in requirements) {
                if (object[req] !== requirements[req]) {
                    return false;
                }
            }

            return true;
        }

        function compareStrings(first, second) {
            return Number(first > second) - 0.5
        }

        function bySpeed(first, second) {
            if (second.speed - first.speed) {
                return second.speed - first.speed;
            }

            return compareStrings(first.name, second.name)
        }

        const commanders = [];

        return {
            getCommander(name, alignment, mana) {
                return Object.create(commanderProto).init(name, alignment, mana);
            },
            getArmyUnit(options) {
                const newUnit = Object.create(armyUnit).init(
                    options.name,
                    options.alignment,
                    options.damage,
                    options.health,
                    options.count,
                    options.speed
                );

                return newUnit;
            },
            getSpell(name, manaCost, effect) {
                return Object.create(spell).init(name, manaCost, effect);
            },
            findCommanders(query) {
                return commanders.filter(c => meetsRequirements(c, query)).sort((f, s) => compareStrings(f.name, s.name));
            },
            findArmyUnitById(id) {
                for (const c of commanders) {
                    const unit = c.army.find(u => u.id === id);

                    if (unit) {
                        return unit;
                    }
                }
            },
            findArmyUnits(query) {
                const result = [];

                for (const c of commanders) {
                    const units = c.army.filter(u => meetsRequirements(u, query));
                    if (units.length) {
                        [].push.apply(result, units);
                    }
                }

                return result.sort(bySpeed);
            },
            addCommanders(...newCommanders) {
                [].push.apply(commanders, newCommanders);
                return this;
            },
            addSpellsTo(commanderName, ...newSpells) {
                const passedCommander = this.findCommanders({ name: commanderName })[0];

                for(const spell of newSpells) {
                    try {
                        validator.validateName(spell.name);
                        validator.validateMana(spell.manaCost);
                        validator.validateEffect(spell.effect);
                    } catch (error) {
                        error.message = ERROR_MESSAGES.INVALID_SPELL_OBJECT;
                        throw error;
                    }
                }

                [].push.apply(passedCommander.spellbook, newSpells);

                return this;
            },
            addArmyUnitTo(commanderName, newUnit) {
                const passedCommander = this.findCommanders({ name: commanderName })[0];

                passedCommander.army.push(newUnit);

                return this;
            },
            spellcast(casterName, spellName, targetUnitId) {
                const caster = this.findCommanders({ name: casterName })[0];

                validator.validateNonNull(caster, 'Cannot cast with non-existant commander ' + casterName + '!');

                const spell = caster.spellbook.find(s => s.name === spellName);

                validator.validateNonNull(spell, casterName + ' does not know ' + spellName);
                validator.validateCastManaCost(caster.mana, spell.manaCost);

                const target = this.findArmyUnitById(targetUnitId);

                validator.validateNonNull(target, ERROR_MESSAGES.TARGET_NOT_FOUND);

                spell.effect(target);

                caster.mana -= spell.manaCost;

                return this;
            },
            battle(attacker, defender) {
                
                validator.validateBattleUnit(attacker, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                validator.validateBattleUnit(defender, ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
                const defenderCountAfterBattle = Math.ceil(((defender.health * defender.count) - (attacker.damage * attacker.count)) / defender.health);

                if(defenderCountAfterBattle < 0) {
                    defender.count = 0;
                } else {
                    defender.count = defenderCountAfterBattle;
                }

                return this;
            }
        };
    } ());

    return battlemanager;
}

module.exports = solve;

////////////////////////



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
        INVALID_ALIGMENT: 'Alignment must be good, neutral or evil!'
    };

    // your implementation goes here
    class Validator {
        static isStringBetween(value, min, max) {
            return value.length >= min && value.length <= max;
        }

        static isStringOnlyLatinSymbols(value) {
            for (let i = 0; i < value.length; i += 1) {
                if (!Validator.isLetter(value[i]) && value[i] !== ' ' && value[i] !== '') {
                    return false;
                }
            }

            return true;
        }

        static isLetter(c) {
            return c.toLowerCase() !== c.toUpperCase();
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
            if (typeof value !== 'string') {
                throw Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            if (!Validator.isStringBetween(value, 2, 20)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }

            if (!Validator.isStringOnlyLatinSymbols(value)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }

            this._name = value;
        }

        get manaCost() {
            return this._manaCost;
        }

        set manaCost(value) {
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value <= 0 ||
                parseInt(value) !== value) {
                throw Error(ERROR_MESSAGES.INVALID_MANA);
            }

            this._manaCost = value;
        }

        get effect() {
            return this._effect;
        }

        set effect(value) {
            if (typeof value !== 'function' ||
                value.length !== 1) {
                throw Error(ERROR_MESSAGES.INVALID_EFFECT);
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
            if (typeof value !== 'string') {
                throw Error(ERROR_MESSAGES.INVALID_NAME_TYPE);
            }

            if (!Validator.isStringBetween(value, 2, 20)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_LENGTH);
            }

            if (!Validator.isStringOnlyLatinSymbols(value)) {
                throw Error(ERROR_MESSAGES.INVALID_NAME_SYMBOLS);
            }

            this._name = value;
        }

        get alignment() {
            return this._alignment;
        }

        set alignment(value) {
            if (typeof value !== 'string' ||
                !(value === 'good' || value === 'neutral' || value === 'evil')) {
                throw Error(ERROR_MESSAGES.INVALID_ALIGMENT);
            }

            this._alignment = value;
        }
    }

    class ArmyUnit extends Unit {
        constructor(name, alignment, damage, health, count, speed) {
            super(name, alignment);

            this.id = ArmyUnit.getId();

            this.damage = damage;
            this.health = health;
            this.count = count;
            this.speed = speed;
        }

        get damage() {
            return this._damage;
        }

        set damage(value) {
            //TODO CHECK IF DMG IS UNDER ZERO OR ZERO;
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value < 0 ||
                value > 100) {
                throw Error(ERROR_MESSAGES.INVALID_DAMAGE);
            }

            this._damage = value;
        }

        get health() {
            return this._health;
        }

        set health(value) {
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value < 0 ||
                value >= 200) {
                throw Error(ERROR_MESSAGES.INVALID_HEALTH);
            }

            this._health = value;
        }

        get count() {
            return this._count;
        }

        set count(value) {
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value < 0 ||
                parseInt(value) !== value) {
                throw Error(ERROR_MESSAGES.INVALID_COUNT);
            }

            this._count = value;
        }

        get speed() {
            return this._speed;
        }

        set speed(value) {
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value < 0 ||
                value >= 100) {
                throw Error(ERROR_MESSAGES.INVALID_SPEED);
            }

            this._speed = value;
        }


        static getId() {
            if (!ArmyUnit._id) {
                ArmyUnit._id = 0;
            }

            return ArmyUnit._id += 1;
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
            if (isNaN(value) ||
                typeof value !== 'number' ||
                value <= 0) {
                throw Error(ERROR_MESSAGES.INVALID_MANA);
            }

            this._mana = value;
        }

        get spellbook() {
            return this._spellbook;
        }

        set spellbook(value) {
            let arrOnlySpells = true;

            for (let i = 0; i < value.length; i += 1) {
                if (!(value[i] instanceof Spell)) {
                    arrOnlySpells = false;
                    break;
                }
            }

            if (!Array.isArray(value) ||
                !arrOnlySpells) {
                throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            }

            this._spellbook = value;
        }

        get army() {
            return this._army;
        }

        set army(value) {
            let arrOnlySpells = true;

            for (let i = 0; i < value.length; i += 1) {
                if (!(value[i] instanceof ArmyUnit)) {
                    arrOnlySpells = false;
                    break;
                }
            }

            if (!Array.isArray(value) ||
                !arrOnlySpells) {
                throw Error('INVALID ARMY');
            }

            this._army = value;
        }
    }

    class battlemanager {
        constructor() {

        }

        static getCommander(name, alignment, mana) {
            return new Commander(name, alignment, mana);
        }

        static getArmyUnit(options) {
            if (!battlemanager.armyUnits) {
                battlemanager.armyUnits = [];
            }

            let unit = new ArmyUnit(options.name, options.alignment, options.damage, options.health, options.count, options.speed);

            battlemanager.armyUnits.push(unit);

            return unit;
        }

        static getSpell(name, manaCost, effect) {
            return new Spell(name, manaCost, effect);
        }

        static addCommanders(...commanders) {
            if (!battlemanager.commanders) {
                battlemanager.commanders = [];
            }

            battlemanager.commanders.push(...commanders);

            return battlemanager;
        }

        static addArmyUnitTo(commanderName, armyUnit) {
            if (!battlemanager.commanders) {
                battlemanager.commanders = [];
            }

            battlemanager._getCommander(commanderName).army.push(armyUnit);

            return battlemanager;
        }

        static addSpellsTo(...params) {
            let commanderName = params[0];

            params = params.splice(1, params.length - 1);

            let arrOnlySpells = true;

            for (let i = 0; i < params.length; i += 1) {
                if (!(params[i] instanceof Spell)) {
                    arrOnlySpells = false;
                    break;
                }
            }

            if (!Array.isArray(params) ||
                !arrOnlySpells) {
                throw Error(ERROR_MESSAGES.INVALID_SPELL_OBJECT);
            }

            battlemanager._getCommander(commanderName).spellbook.push(...params);

            return battlemanager;
        }

        static findCommanders(query) {
            let foundedCommanders = [];

            let properties = Object.keys(query);

            for (let i = 0; i < battlemanager.commanders.length; i += 1) {
                let add = true;
                for (let j = 0; j < properties.length; j += 1) {
                    if (battlemanager.commanders[i][properties[j]] !== query[properties[j]]) {
                        add = false;
                        break;
                    }
                }

                if (add) {
                    foundedCommanders.push(battlemanager.commanders[i]);
                }
            }

            return foundedCommanders.sort(function(a, b) {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        }

        static findArmyUnitById(id) {
            if (isNaN(id) ||
                typeof id === 'number') {
                for (let i = 0; i < battlemanager.armyUnits.length; i += 1) {
                    if (battlemanager.armyUnits[i].id === id) {
                        return battlemanager.armyUnits[i];
                    }
                }

                return undefined;
            }
        }

        static findArmyUnits(id) {

            let foundedUnits = [];

            let properties = Object.keys(id);

            for (let i = 0; i < battlemanager.armyUnits.length; i += 1) {
                let add = true;
                for (let j = 0; j < properties.length; j += 1) {
                    if (battlemanager.armyUnits[i][properties[j]] !== id[properties[j]]) {
                        add = false;
                        break;
                    }
                }

                if (add) {
                    foundedUnits.push(battlemanager.armyUnits[i]);
                }
            }

            let sortedArr = foundedUnits.sort(function(a, b) {
                if (a.speed === b.speed) {
                    return a.name > b.name;
                }

                return a.speed < b.speed;
            });


            return sortedArr;
        }

        static spellcast(casterName, spellName, targetUnitId) {
            if (!battlemanager.commanders) {
                battlemanager.commanders = [];
            }

            let commanderCast = battlemanager._getCommander(casterName);

            if (commanderCast === null) {
                throw Error('Cannot cast with non-existant commander ' + casterName + '!');
            }

            let spell = null;
            for (let i = 0; i < commanderCast.spellbook.length; i += 1) {
                if (commanderCast.spellbook[i].name === spellName) {
                    spell = commanderCast.spellbook[i];
                    break;
                }
            }

            if (spell === null) {
                throw Error(casterName + ' does not know ' + spellName);
            }

            let unit = battlemanager._getUnitById(targetUnitId);

            if (unit === null) {
                throw Error(ERROR_MESSAGES.TARGET_NOT_FOUND);
            }

            if (commanderCast.mana < spell.manaCost) {
                throw Error(ERROR_MESSAGES.NOT_ENOUGH_MANA);
            }

            spell.effect(unit);

            commanderCast.mana -= spell.manaCost;

            return battlemanager;
        }

        static battle(attacker, defender) {
            if (!(attacker instanceof ArmyUnit) ||
                !(defender instanceof ArmyUnit)) {
                throw Error(ERROR_MESSAGES.INVALID_BATTLE_PARTICIPANT);
            }

            let totalDmg = attacker.damage * attacker.count;

            defender.count = Math.max(Math.ceil((defender.health * defender.count - totalDmg) / defender.health), 0);

            return battlemanager;
        }


        static _getCommander(commanderName) {
            if (!battlemanager.commanders) {
                battlemanager.commanders = [];
            }

            for (let i = 0; i < battlemanager.commanders.length; i += 1) {
                if (battlemanager.commanders[i].name === commanderName) {
                    return battlemanager.commanders[i];
                }
            }

            return null;
        }

        static _getUnitById(id) {
            if (!battlemanager.armyUnits) {
                battlemanager.armyUnits = [];
            }

            for (let i = 0; i < battlemanager.armyUnits.length; i += 1) {
                if (battlemanager.armyUnits[i].id === id) {
                    return battlemanager.armyUnits[i];
                }
            }

            return null;
        }
    }

    return battlemanager;
}

module.exports = solve;