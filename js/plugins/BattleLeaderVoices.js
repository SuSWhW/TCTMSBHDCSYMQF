/*:
 * @plugindesc パーティリーダーの状況に応じた音声を再生します。
 * @author F_
 * 
 * @help
 * 
 * パーティリーダーの状況に応じた音声を再生します。
 * 
 * 
 * ■ 再生タイミング
 * 
 * 音声を再生可能なタイミングには次の二つがあります。
 * 
 * * 反応　　　：スキル被命中時などの受動的な反応
 * * アクション：スキル使用時などの能動的な行動
 * 
 * 
 * ■ 反応の設定
 * 
 * 反応はスキルやアイテムのメモ欄に、
 * 
 *   <voice-reaction: NAME>        ※ NAME に任意の反応名を記述
 * 
 * とタグを設定することで定義します。
 * 
 * このように定義したスキルやアイテムの反応名を、
 * プラグインパラメータから音声と関連付けることで、
 * 戦闘中にパーティリーダーにそれらのスキルやアイテムが命中した際に、
 * 対応した音声を再生することができます。
 * 
 * また、予め定義された次の反応を利用することも可能です。
 * 
 * skill  ：反応名の定義されていないすべてのスキルの命中時
 * item   ：反応名の定義されていないすべてのアイテムの命中時
 * victory：戦闘勝利時
 * 
 * 
 * ■ アクションの設定
 * 
 * アクションはスキルやアイテムのメモ欄に、
 * 
 *   <voice-action: NAME>        ※ NAME に任意のアクション名を記述
 * 
 * とタグを設定することで定義します。
 * 
 * このように定義したスキルやアイテムのアクションを、
 * プラグインパラメータから音声と関連付けることで、
 * 戦闘中にパーティリーダーがそれらのスキルやアイテムを使用した際に、
 * 対応した音声を再生することができます。
 * 
 * また、予め定義された次のアクションを利用することも可能です。
 * 
 * skill  ：アクション名の定義されていないすべてのスキルの使用時
 * item   ：アクション名の定義されていないすべてのアイテムの使用時
 * 
 * 
 * ■ 音声の設定
 * 
 * 音声はプラグインパラメータにて次の二つを関連付けることで再生されます。
 * 
 * * 反応名またはアクション名
 * * 音声ファイル（複数指定可）
 * 
 * 再生する音声ファイルは audio/voice/ 以下に配置する必要があります。
 * 
 * ひとつの反応またはアクションに対して複数の音声を設定した場合、
 * 一様確率でランダムに音声が選択されて再生されます。
 * 
 * @param Entries
 * @type struct<Entry>[]
 * @default []
 * @text 再生音声リスト
 * @desc 再生する音声と対応する反応またはアクションのリスト。
 * 
 * @param UseVolumeOption
 * @type boolean
 * @default true
 * @text 音量設定の使用
 * @desc オプション画面に戦闘音声の音量設定を追加するかどうか。
 * 
 * @param VolumeOptionLabel
 * @parent UseVolumeOption
 * @type string
 * @default 戦闘音声 音量
 * @text 項目名
 * @desc 戦闘音声の音量設定の項目名。
 */

/*~struct~Entry:
 * @param type
 * @type select
 * @option 反応
 * @value reaction
 * @option アクション
 * @value action
 * @default reaction
 * @text 対象の種類
 * @desc 再生タイミングの種類。
 * 
 * @param id
 * @type string
 * @text 対象名
 * @desc 再生タイミングの反応名またはアクション名。
 * 
 * @param audios
 * @type struct<Voice>[]
 * @default []
 * @text 音声
 * @desc 再生候補の音声リスト。
 */

/*~struct~Voice:
 * @param name
 * @type file
 * @dir audio/voice/
 * @require 1
 * @text 音声ファイル
 * @desc 再生する音声ファイル。
 * 
 * @param volume
 * @type number
 * @min 0
 * @max 100
 * @default 90
 * @text 音量
 * @desc 再生時の音量(%)。
 * 
 * @param pitch
 * @type number
 * @min 50
 * @max 150
 * @default 100
 * @text ピッチ
 * @desc 再生時のピッチ(%)。
 * 
 * @param pan
 * @type number
 * @min -100
 * @max 100
 * @default 0
 * @text 位相
 * @desc 再生時の位相。
 */

"use strict";

{
	const TAG_SKILL_REACTION_ID = "voice-reaction";
	const TAG_ITEM_REACTION_ID = "voice-reaction";
	const TAG_SKILL_ACTION_ID = "voice-action";
	const TAG_ITEM_ACTION_ID = "voice-action";

	const DEFAULT_SKILL_REACTION_ID = "skill";
	const DEFAULT_ITEM_REACTION_ID = "item";
	const VICTORY_REACTION_ID = "victory";
	const DEFAULT_SKILL_ACTION_ID = "skill";
	const DEFAULT_ITEM_ACTION_ID = "item";

	const makeCache = fn => {
		const cache = new WeakMap();
		return input => {
			if (cache.has(input)) {
				return cache.get(input);
			} else {
				const value = fn(input);
				cache.set(input, value);
				return value;
			}
		};
	};

	const parseArray = parser => s => JSON.parse(s).map(si => parser(si));

	const parseInteger = s => Number.parseInt(s, 10);

	const parseBoolean = s => {
		switch (s) {
			case "true": return true;
			case "false": return false;
			default: throw new Error(`invalid boolean value: ${s}`);
		}
	};

	const parseEntry = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "type": return value;
			case "id": return value;
			case "audios": return parseSeArray(value);
			default: throw new Error(`invalid entry property: ${key}`);
		}
	});

	const parseEntryArray = parseArray(parseEntry);

	const parseSe = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "name": return value;
			case "volume": return parseInteger(value);
			case "pitch": return parseInteger(value);
			case "pan": return parseInteger(value);
			default: throw new Error(`invalid se property: ${key}`);
		}
	});

	const parseSeArray = parseArray(parseSe);

	const parseAttributeTag = (tag, default_, parser) => {
		const cache = makeCache(meta => parser(meta[tag]));
		return meta => typeof meta[tag] === 'string' ? cache(meta) : default_;
	};

	const parseReactionTag = (tag, default_) => parseAttributeTag(tag, default_, s => s.trim());

	const parseSkillReactionTag = parseReactionTag(TAG_SKILL_REACTION_ID, DEFAULT_SKILL_REACTION_ID);

	const parseItemReactionTag = parseReactionTag(TAG_ITEM_REACTION_ID, DEFAULT_ITEM_REACTION_ID);

	const parseActionTag = (tag, default_) => parseAttributeTag(tag, default_, s => s.trim());

	const parseSkillActionTag = parseActionTag(TAG_SKILL_ACTION_ID, DEFAULT_SKILL_ACTION_ID);

	const parseItemActionTag = parseActionTag(TAG_ITEM_ACTION_ID, DEFAULT_ITEM_ACTION_ID);

	const makeKey = (type, id) => `${type}::${id}`;

	const PLUGIN_NAME = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const ENTRIES = parseEntryArray(PARAMS["Entries"]);
	const USE_VOLUME_OPTION = parseBoolean(PARAMS["UseVolumeOption"]);
	const VOLUME_OPTION_LABEL = PARAMS["VolumeOptionLabel"];

	const VOICE_LIST_MAP = new Map(ENTRIES.map(({ type, id, audios }) => [makeKey(type, id), audios]));

	const USE_REACTION = ENTRIES.some(({ type }) => type === 'reaction');
	const USE_ACTION = ENTRIES.some(({ type }) => type === 'action');

	AudioManager._battleLeaderVoiceVolume = 100;
	AudioManager._battleLeaderVoiceBuffer = null;

	Object.defineProperty(AudioManager, 'battleLeaderVoiceVolume', {
		get() { return this._battleLeaderVoiceVolume; },
		set(value) { this._battleLeaderVoiceVolume = value; },
		configurable: true,
	});

	AudioManager.playBattleLeaderVoice = function (voice) {
		this.stopBattleLeaderVoice();
		if (voice.name) {
			this._battleLeaderVoiceBuffer = this.createBuffer('voice', voice.name);
			this.updateBattleLeaderVoiceParameters(voice);
			this._battleLeaderVoiceBuffer.play(false);
			this._battleLeaderVoiceBuffer.addStopListener(this.stopBattleLeaderVoice.bind(this));
		}
	};

	AudioManager.updateBattleLeaderVoiceParameters = function (voice) {
		this.updateBufferParameters(this._battleLeaderVoiceBuffer, this._battleLeaderVoiceVolume, voice);
	};

	AudioManager.stopBattleLeaderVoice = function () {
		if (this._battleLeaderVoiceBuffer) {
			this._battleLeaderVoiceBuffer.stop();
			this._battleLeaderVoiceBuffer = null;
		}
	};

	Game_Actor.prototype.playRandomLeaderVoice = function (key) {
		if (VOICE_LIST_MAP.has(key)) {
			const voiceList = VOICE_LIST_MAP.get(key);
			if (voiceList.length !== 0) {
				const index = Math.floor(Math.random() * voiceList.length);
				const voice = voiceList[index];
				AudioManager.playBattleLeaderVoice(voice);
			}
		}
	};

	const Scene_Battle_terminate = Scene_Battle.prototype.terminate;
	Scene_Battle.prototype.terminate = function () {
		Scene_Battle_terminate.apply(this, arguments);

		AudioManager.stopBattleLeaderVoice();
	};

	if (USE_REACTION) {
		const Game_Action_apply = Game_Action.prototype.apply;
		Game_Action.prototype.apply = function (target) {
			Game_Action_apply.apply(this, arguments);

			const result = target.result();
			if (this.isSkill()) {
				result.voiceReaction = parseSkillReactionTag(this.item().meta);
			} else if (this.isItem()) {
				result.voiceReaction = parseItemReactionTag(this.item().meta);
			}
		};

		const Game_ActionResult_clear = Game_ActionResult.prototype.clear;
		Game_ActionResult.prototype.clear = function () {
			Game_ActionResult_clear.apply(this, arguments);

			this.voiceReaction = undefined;
		};

		const Game_Actor_performVictory = Game_Actor.prototype.performVictory;
		Game_Actor.prototype.performVictory = function () {
			Game_Actor_performVictory.apply(this, arguments);

			if ($gameParty.leader() === this) {
				this.playRandomReactionVoice(VICTORY_REACTION_ID);
			}
		};

		Game_Actor.prototype.performVoiceReaction = function (reaction) {
			if ($gameParty.leader() === this) {
				this.playRandomReactionVoice(reaction);
			}
		};

		Game_Actor.prototype.playRandomReactionVoice = function (action) {
			this.playRandomLeaderVoice(makeKey('reaction', action));
		};

		const Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
		Window_BattleLog.prototype.displayDamage = function (target) {
			const result = target.result();
			if (target.isActor() && result.isHit()) {
				this.push("performVoiceReaction", target, result.voiceReaction);
			}

			Window_BattleLog_displayDamage.apply(this, arguments);
		};

		Window_BattleLog.prototype.performVoiceReaction = function (target, reaction) {
			target.performVoiceReaction(reaction);
		};
	}

	if (USE_ACTION) {
		const Game_Actor_performAction = Game_Actor.prototype.performAction;
		Game_Actor.prototype.performAction = function (action) {
			Game_Actor_performAction.apply(this, arguments);

			if ($gameParty.leader() === this) {
				if (action.isSkill()) {
					this.playRandomActionVoice(parseSkillActionTag(action.item().meta));
				} else if (action.isItem()) {
					this.playRandomActionVoice(parseItemActionTag(action.item().meta));
				}
			}
		};

		Game_Actor.prototype.playRandomActionVoice = function (action) {
			this.playRandomLeaderVoice(makeKey('action', action));
		};
	}

	if (USE_VOLUME_OPTION) {
		Object.defineProperty(ConfigManager, 'battleLeaderVoiceVolume', {
			get() { return AudioManager.battleLeaderVoiceVolume; },
			set(value) { AudioManager.battleLeaderVoiceVolume = value; },
			configurable: true,
		});

		const ConfigManager_makeData = ConfigManager.makeData;
		ConfigManager.makeData = function () {
			const config = ConfigManager_makeData.apply(this, arguments);
			config.battleLeaderVoiceVolume = this.battleLeaderVoiceVolume;
			return config;
		};

		const ConfigManager_applyData = ConfigManager.applyData;
		ConfigManager.applyData = function (config) {
			ConfigManager_applyData.apply(this, arguments);
			this.battleLeaderVoiceVolume = this.readVolume(config, 'battleLeaderVoiceVolume');
		};

		const Window_Options_addVolumeOptions = Window_Options.prototype.addVolumeOptions;
		Window_Options.prototype.addVolumeOptions = function () {
			Window_Options_addVolumeOptions.apply(this, arguments);

			this.addCommand(VOLUME_OPTION_LABEL, 'battleLeaderVoiceVolume');
		};
	}
}