/*:
 * @plugindesc パーティリーダーの状態に応じたピクチャを表示します。
 * @author F_
 * 
 * @help
 * 
 * 各状態に応じたパーティリーダーの画像を設定することで、
 * 状態によって自動的に画像が切り替わるピクチャを表示します。
 * 
 * 
 * 
 * ■ 設定の流れ
 * 
 * ピクチャの表示には次の設定が必要です。
 * 
 * 1. 条件の設定（切替の契機となる条件の定義）
 * 2. 画像の設定（表示画像とその表示条件の対応付け）
 * 3. 位置の設定（画像の表示位置の決定）
 * 
 * 
 * 
 * ■ 条件の設定
 * 
 * まずは各画像を表示する際の条件について名前を付けて定義します。
 * ここで定義した条件は、画像の表示条件を指定する際に利用します。
 * 
 * 例えば、眠っている状態の画像を表示したい場合には、
 * 「『睡眠』のステートが付加されている」という条件を定義して、
 * その条件を眠っている画像の表示条件として設定することで関連付けます。
 * 
 * 設定可能な条件は次の通りです。
 * 
 * 反応条件　　　：スキル被命中時などの一時的な反応に関する条件
 * アクション条件：スキル使用中などの一時的な行動に関する条件
 * スイッチ条件　：スイッチの値に関する条件
 * 変数条件　　　：変数の値に関する条件
 * ステート条件　：付加されているステートに関する条件
 * HP条件　　　　：残りHPに関する条件
 * 
 * 
 * ○ 条件名の設定
 * 
 * 各条件には必ず一意な名前を設定する必要があります。
 * この名前は画像の設定の際に、表示条件を指定するために使用します。
 * 
 * 
 * ○ 優先度の設定
 * 
 * 表示条件を満たしている画像が複数存在する場合、
 * 表示画像はその優先順位がより高いものが選択されます。
 * 
 * 表示画像の優先順位は、その表示条件の優先順位によって決定されます。
 * 優先順位の高い表示条件がより多く設定されている画像ほど優先順位が高くなります。
 * 
 * 各条件の優先順位は優先度の設定値が大きいほど高くなります。
 * 同一の優先度の条件間では、条件の種類等によって優先順位が決定されます。
 * 
 * 
 * ○ 反応条件の設定
 * 
 * 反応条件は反応名を指定することで、
 * 対応する反応状態の間、条件が満たされていると判定されます。
 * 
 * 反応はスキルやアイテムのメモ欄に、
 * 
 *   <picture-reaction: NAME>        ※ NAME に任意の反応名を記述
 * 
 * とタグを設定することで定義します。
 * 
 * このように定義したスキルやアイテムの反応名を反応条件に設定すると、
 * 戦闘中にパーティリーダーにそれらのスキルやアイテムが命中した際、
 * その反応条件が満たされます。
 * 
 * 例えば、スキル「攻撃」のメモ欄に <picture-reaction: attack> と記述した場合、
 * 反応条件の反応に attack と記入すると、
 * パーティリーダーが「攻撃」を受けた際、その反応条件が満たされます。
 * 
 * 複数のスキルやアイテムに同一の反応名を設定しても構いません。
 * その場合、それらすべてのスキルやアイテムの命中時に条件が満たされます。
 * 
 * また、予め定義された次の反応を利用することも可能です。
 * 
 * skill  ：反応名の定義されていないすべてのスキルの命中時
 * item   ：反応名の定義されていないすべてのアイテムの命中時
 * victory：戦闘勝利後
 * 
 * 
 * ○ アクション条件の設定
 * 
 * アクション条件はアクション名を指定することで、
 * 対応するアクションの間、条件が満たされていると判定されます。
 * 
 * アクションはスキルやアイテムのメモ欄に、
 * 
 *   <picture-action: NAME>        ※ NAME に任意のアクション名を記述
 * 
 * とタグを設定することで定義します。
 * 
 * このように定義したスキルやアイテムのアクション名をアクション条件に設定すると、
 * 戦闘中にパーティリーダーがそれらのスキルやアイテムを使用している間、
 * そのアクション条件が満たされます。
 * 
 * 例えば、スキル「攻撃」のメモ欄に <picture-action: attack> と記述した場合、
 * アクション条件のアクションに attack と記入すると、
 * パーティリーダーの「攻撃」中、そのアクション条件が満たされます。
 * 
 * 複数のスキルやアイテムに同一のアクション名を設定しても構いません。
 * その場合、それらすべてのスキルやアイテムの使用中に条件が満たされます。
 * 
 * また、予め定義された次のアクションを利用することも可能です。
 * 
 * skill  ：アクション名の定義されていないすべてのスキルの使用中
 * item   ：アクション名の定義されていないすべてのアイテムの使用中
 * 
 * 
 * ○ スイッチ条件の設定
 * 
 * スイッチ条件はスイッチとその値を指定することで、
 * スイッチの値が指定値と一致している間、条件が満たされていると判定されます。
 * 
 * 
 * ○ 変数条件の設定
 * 
 * 変数条件は変数と演算子および比較値を指定することで、
 * 変数の値が比較値との関係を満たす間、条件が満たされていると判定されます。
 * 
 * 演算子は変数の値を左辺、比較値を右辺として適用されます。
 * 
 * 
 * ○ ステート条件の設定
 * 
 * ステート条件はステートを指定することで、
 * パーティリーダーにそのステートが付加されている間、
 * 条件が満たされていると判定されます。
 * 
 * 
 * ○ HP条件の設定
 * 
 * HP条件は百分率による閾値を指定することで、
 * パーティリーダーの残りHPの割合が閾値以下の間、
 * 条件が満たされていると判定されます。
 * 
 * 
 * 
 * ■ 画像の設定
 * 
 * 各条件を定義したら、それらを用いて画像の表示設定を行います。
 * 画像には、表示する画像ファイルと表示する条件を指定します。
 * 
 * 表示する画像ファイルは img/pictures/ 以下に配置する必要があります。
 * 
 * 表示条件には定義した条件の名前を指定します。
 * 画像は設定したすべての条件が満たされている間のみ、表示条件を満たします。
 * 表示条件がひとつも存在しない場合には、常に表示条件を満たします。
 * 
 * 
 * 
 * ■ 位置の設定
 * 
 * 画像の位置は次の三つの設定によって指定します。
 * 
 * a. 画面上の基準位置 (%)
 * b. 画像上の基準位置 (%)
 * c. 位置調整 (px)
 * 
 * 画像はまず「画面上の基準位置」と「画像上の基準位置」の二点が、
 * 重なるように配置された後に、「位置調整」の指定分だけずれて表示されます。
 * 
 * 例えば、画面の右端中央から左に20px離れた場所に、
 * 画像の右端中央を合わせたい場合、
 * 
 * a: x = 100, y = 50
 * b: x = 100, y = 50
 * c: x = -20, y = 0
 * 
 * と設定します。
 * 
 * ※ x軸は右方向を正、y軸は下方向を正とします。
 * ※ 百分率は左端または上端を0%、右端または下端を100%とします。
 * 
 * 
 * 
 * ■ 付録：優先順位の詳細
 * 
 * 画像の優先順位は、基本的に条件の優先度の設定によって調整します。
 * 以下に示す詳細は、調整がうまくいかない場合にのみ参照してください。
 * 
 * 任意の二つの画像のどちらが優先されるかは次のように決定されます。
 * 
 * 1. 各画像に設定されたすべての条件の優先順位を高い順に並べる。
 * 2. 各画像の条件の優先順位を先頭から順に比較して、
 *    先により高い優先順位の条件が現れた画像が優先される。
 * 3. 手順2によって片方の画像に比較できる条件がなくなった場合、
 *    条件数がより多い画像が優先される。
 * 
 * 任意の二つの条件のどちらが優先されるかは次のように決定されます。
 * 
 * 1. 優先度が異なる場合、より優先度の大きな条件が優先される。
 * 2. 条件の種類が異なる場合、次の比較によって優先される条件を決定する。
 *    反応条件 > アクション条件 > スイッチ条件 > 変数条件 > ステート条件 > HP条件
 * 3. 各条件の種類によって優先条件を決定する。
 *   3.1. 反応条件の場合
 *     3.1.1. 辞書順で小さな反応名の条件が優先される。
 *   3.2. アクション条件の場合
 *     3.2.1. 辞書順で小さなアクション名の条件が優先される。
 *   3.3. スイッチ条件の場合
 *     3.3.1. よりIDの小さなスイッチの条件が優先される。
 *     3.3.2. 値が異なる場合、OFFの条件が優先される。
 *   3.4. 変数条件の場合
 *     3.4.1. よりIDの小さな変数の条件が優先される。
 *     3.4.2. 演算子に対する次の比較によって優先される条件を決定する。
 *            "＝" > "≧" > "≦" > "＞" > "＜" > "≠"
 *     3.4.3. 比較値によって優先条件を決定する。
 *       3.4.3.1 演算子が"≧"か"＞"の場合、より比較値が大きな条件が優先される。
 *       3.4.3.2 演算子がそれ以外の場合、より比較値が小さな条件が優先される。
 *   3.5. ステート条件の場合
 *     3.5.1. よりIDの小さなステートの条件が優先される。
 *   3.6. HP条件の場合
 *     3.6.1. より閾値の小さな条件が優先される。
 * 4. 手順3により決定しない場合、辞書順で小さな条件名の条件が優先される。
 * 
 * @param Position
 * @type struct<Position>
 * @text 表示位置
 * @desc 画像の表示位置。
 * 
 * @param PictureList
 * @type struct<Picture>[]
 * @default []
 * @text 画像リスト
 * @desc 表示画像のリスト。
 * 
 * @param ReactionConditions
 * @type struct<ReactionCondition>[]
 * @default []
 * @text 反応条件
 * @desc 反応条件の定義。
 * 
 * @param ActionConditions
 * @type struct<ActionCondition>[]
 * @default []
 * @text アクション条件
 * @desc アクション条件の定義。
 * 
 * @param SwitchConditions
 * @type struct<SwitchCondition>[]
 * @default []
 * @text スイッチ条件
 * @desc スイッチ条件の定義。
 * 
 * @param VariableConditions
 * @type struct<VariableCondition>[]
 * @default []
 * @text 変数条件
 * @desc 変数条件の定義。
 * 
 * @param StateConditions
 * @type struct<StateCondition>[]
 * @default []
 * @text ステート条件
 * @desc ステート条件の定義。
 * 
 * @param HpConditions
 * @type struct<HpCondition>[]
 * @default []
 * @text HP条件
 * @desc HP条件の定義。
 */

/*~struct~Position:
 * @param origin
 * @type struct<NVec2>
 * @default {"x":"0","y":"0"}
 * @text 画面上の基準位置
 * @desc 画像上の基準位置と合わせる画面上の点。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param anchor
 * @type struct<NVec2>
 * @default {"x":"0","y":"0"}
 * @text 画像上の基準位置
 * @desc 画面上の基準位置と合わせる画像上の点。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param offset
 * @type struct<Vec2>
 * @default {"x":"0","y":"0"}
 * @text 位置調整
 * @desc 基準位置を合わせた後に移動する量(px)。
 */

/*~struct~NVec2:
 * @param x
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text x
 * @desc x成分。
 * 
 * @param y
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text y
 * @desc y成分。
 */

/*~struct~Vec2:
 * @param x
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text x
 * @desc x成分。
 * 
 * @param y
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text y
 * @desc y成分。
 */

/*~struct~Picture:
 * @param file
 * @type file
 * @dir img/pictures/
 * @require 1
 * @text 画像ファイル
 * @desc 表示する画像ファイル。
 * 
 * @param conditions
 * @type string[]
 * @default []
 * @text 表示条件
 * @desc 画像を表示する条件の名前。
 */

/*~struct~ReactionCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 9999
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param id
 * @type string
 * @text 反応
 * @desc 対象とする反応の名前。
 */

/*~struct~ActionCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 9999
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param id
 * @type string
 * @text アクション
 * @desc 対象とするアクションの名前。
 */

/*~struct~SwitchCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param id
 * @type switch
 * @default 0
 * @text スイッチ
 * @desc 対象とするスイッチ。
 * 
 * @param value
 * @type boolean
 * @default true
 * @text 値
 * @desc 条件を満たすときのスイッチの値。
 */

/*~struct~VariableCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param id
 * @type variable
 * @default 0
 * @text 変数
 * @desc 対象とする変数。
 * 
 * @param operator
 * @type select
 * @option ＝
 * @value eq
 * @option ≧
 * @value ge
 * @option ≦
 * @value le
 * @option ＞
 * @value gt
 * @option ＜
 * @value lt
 * @option ≠
 * @value ne
 * @default eq
 * @text 演算子
 * @desc 条件を満たすかどうか判定する演算子。
 * 
 * @param value
 * @type number
 * @min -99999999
 * @max 99999999
 * @default 0
 * @text 値
 * @desc 演算子の右辺として比較される値。
 */

/*~struct~StateCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param id
 * @type state
 * @default 0
 * @text ステート
 * @desc 対象とするステート。
 */

/*~struct~HpCondition:
 * @param name
 * @type string
 * @text 条件名
 * @desc 条件の一意な名前。
 * 
 * @param priority
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text 優先度
 * @desc 条件の優先度。
 * 
 * @param threshold
 * @type number
 * @min 0
 * @max 100
 * @default 100
 * @text 閾値
 * @desc 条件を満たすときの最大の残りHPの割合(%)。
 */

"use strict";

{
	const DEFAULT_POSITION = {
		origin: { x: 0, y: 0 },
		anchor: { x: 0, y: 0 },
		offset: { x: 0, y: 0 },
	};

	const TAG_SKILL_REACTION_ID = "picture-reaction";
	const TAG_ITEM_REACTION_ID = "picture-reaction";
	const TAG_SKILL_ACTION_ID = "picture-action";
	const TAG_ITEM_ACTION_ID = "picture-action";

	const DEFAULT_SKILL_REACTION_ID = "skill";
	const DEFAULT_ITEM_REACTION_ID = "item";
	const VICTORY_REACTION_ID = "victory";
	const DEFAULT_SKILL_ACTION_ID = "skill";
	const DEFAULT_ITEM_ACTION_ID = "item";

	const pipe = (...args) => args.reduce((acc, fn) => fn(acc));

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

	const withDefault = (parser, default_) => s => s !== "" ? parser(s) : default_;

	const parseArray = parser => s => JSON.parse(s).map(si => parser(si));

	const parseStringArray = parseArray(s => s);

	const parseInteger = s => Number.parseInt(s, 10);

	const parseBoolean = s => {
		switch (s) {
			case "false": return false;
			case "true": return true;
			default: throw new Error(`invalid boolean value: ${s}`);
		}
	};

	const parsePosition = withDefault(
		s => JSON.parse(s, (key, value) => {
			switch (key) {
				case "": return value;
				case "origin": return parseNVec2(value);
				case "anchor": return parseNVec2(value);
				case "offset": return parseVec2(value);
				default: throw new Error(`invalid position property: ${key}`);
			}
		}),
		DEFAULT_POSITION,
	);

	const parseNVec2 = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "x": return parseInteger(value) / 100;
			case "y": return parseInteger(value) / 100;
			default: throw new Error(`invalid nvec2 property: ${key}`);
		}
	});

	const parseVec2 = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "x": return parseInteger(value);
			case "y": return parseInteger(value);
			default: throw new Error(`invalid vec2 property: ${key}`);
		}
	});

	const parsePicture = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "file": return value;
			case "conditions": return parseStringArray(value);
			default: throw new Error(`invalid picture property: ${key}`);
		}
	});

	const parsePictureArray = parseArray(parsePicture);

	const parseReactionCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'reaction', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return value;
			default: throw new Error(`invalid reaction condition property: ${key}`);
		}
	});

	const parseReactionConditionArray = parseArray(parseReactionCondition);

	const parseActionCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'action', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return value;
			default: throw new Error(`invalid action condition property: ${key}`);
		}
	});

	const parseActionConditionArray = parseArray(parseActionCondition);

	const parseSwitchCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'switch', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return parseInteger(value);
			case "value": return parseBoolean(value);
			default: throw new Error(`invalid switch condition property: ${key}`);
		}
	});

	const parseSwitchConditionArray = parseArray(parseSwitchCondition);

	const parseVariableCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'variable', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return parseInteger(value);
			case "operator": return value;
			case "value": return parseInteger(value);
			default: throw new Error(`invalid variable condition property: ${key}`);
		}
	});

	const parseVariableConditionArray = parseArray(parseVariableCondition);

	const parseStateCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'state', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return parseInteger(value);
			default: throw new Error(`invalid state condition property: ${key}`);
		}
	});

	const parseStateConditionArray = parseArray(parseStateCondition);

	const parseHpCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'hp', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "threshold": return parseInteger(value);
			default: throw new Error(`invalid hp condition property: ${key}`);
		}
	});

	const parseHpConditionArray = parseArray(parseHpCondition);

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

	const sortPictures = (pictures, conditions) => {
		const prioritizer = makeConditionPrioritizer(conditions);
		const toPriorityList = new Map(pictures.map(picture => [
			picture,
			picture.conditions.map(prioritizer).sort((a, b) => a - b),
		]));
		return pictures.slice().sort(comparePictures(toPriorityList));
	};

	const makeConditionPrioritizer = conditions => {
		const sorted = conditions.sort(compareConditions);
		const entries = [...sorted.entries()].map(([i, { name }]) => [name, i]);
		const map = new Map(entries);
		return name => {
			if (!map.has(name)) throw new Error(`condition "${name}" not found`);
			return map.get(name);
		};
	};

	const comparePictures = map => (a, b) => comparePriorityLists(map.get(a), map.get(b));

	const comparePriorityLists = (a, b) => -compareArrays(a, b, (a, b) => b - a);

	const compareConditions = (a, b) => pipe(
		compareConditionPriorities(a, b),
		cmp => cmp !== 0 ? cmp : compareConditionType(a, b),
		cmp => cmp !== 0 ? cmp : compareConditionDetails(a, b),
		cmp => cmp !== 0 ? cmp : compareConditionName(a, b),
	);

	const compareConditionPriorities = (a, b) => b.priority - a.priority;

	const compareConditionType = (a, b) => {
		const priority = type => {
			switch (type) {
				case 'reaction': return 5;
				case 'action': return 4;
				case 'switch': return 3;
				case 'variable': return 2;
				case 'state': return 1;
				case 'hp': return 0;
				default: throw new Error(`invalid condition type: ${type}`);
			}
		};
		return priority(b.type) - priority(a.type);
	};

	const compareConditionDetails = (a, b) => {
		if (a.type !== b.type) throw new Error(`assertion failed: a.type === b.type`);
		switch (a.type) {
			case 'reaction': return compareReactionConditions(a, b);
			case 'action': return compareActionConditions(a, b);
			case 'switch': return compareSwitchConditions(a, b);
			case 'variable': return compareVariableConditions(a, b);
			case 'state': return compareStateConditions(a, b);
			case 'hp': return compareHpConditions(a, b);
			default: throw new Error(`invalid condition type: ${type}`);
		}
	};

	const compareConditionName = (a, b) => compareStrings(a.name, b.name);

	const compareReactionConditions = (a, b) => compareStrings(a.id, b.id);

	const compareActionConditions = (a, b) => compareStrings(a.id, b.id);

	const compareSwitchConditions = (a, b) => pipe(
		a.id - b.id,
		cmp => cmp !== 0 ? cmp : compareBooleans(a.value, b.value),
	);

	const compareVariableConditions = (a, b) => pipe(
		a.id - b.id,
		cmp => cmp !== 0 ? cmp : compareVariableOperators(a.operator, b.operator),
		cmp => cmp !== 0 ? cmp : compareVariableValue(a.value, b.value, a.operator),
	);

	const compareVariableOperators = (a, b) => {
		const priority = operator => {
			switch (operator) {
				case 'eq': return 5;
				case 'ge': return 4;
				case 'le': return 3;
				case 'gt': return 2;
				case 'lt': return 1;
				case 'ne': return 0;
				default: throw new Error(`invalid operator: ${operator}`);
			}
		};
		return priority(b) - priority(a);
	};

	const compareVariableValue = (a, b, operator) => {
		switch (operator) {
			case 'eq': return a - b;
			case 'ge': return b - a;
			case 'le': return a - b;
			case 'gt': return b - a;
			case 'lt': return a - b;
			case 'ne': return a - b;
			default: throw new Error(`invalid operator: ${operator}`);
		}
	};

	const compareStateConditions = (a, b) => a.id - b.id;

	const compareHpConditions = (a, b) => a.threshold - b.threshold;

	const compareBooleans = (a, b) => (a ? 1 : 0) - (b ? 1 : 0);

	const compareStrings = (a, b) =>
		compareArrays([...a], [...b], (a, b) => a.codePointAt(0) - b.codePointAt(0));

	const compareArrays = (a, b, fn) => {
		const min = Math.min(a.length, b.length);
		for (let i = 0; i < min; i++) {
			const cmp = fn(a[i], b[i]);
			if (cmp !== 0) return cmp;
		}
		return a.length - b.length;
	};

	const __base = (obj, prop) => {
		if (obj.hasOwnProperty(prop)) {
			return obj[prop];
		} else {
			const proto = Object.getPrototypeOf(obj);
			return function () { return proto[prop].apply(this, arguments); };
		}
	};

	const simpleEqual = (a, b) => {
		const arrayEqual = (a, b, eq) => a.length === b.length && a.every((v, i) => eq(v, b[i]));
		const pojoEqual = (a, b, eq) => {
			const hasOwnProperty = Object.prototype.hasOwnProperty;
			const has = (obj, key) => hasOwnProperty.call(obj, key);
			const akeys = Object.getOwnPropertyNames(a);
			const bkeys = Object.getOwnPropertyNames(b);
			return akeys.length === bkeys.length && akeys.every(k => has(b, k) && eq(a[k], b[k]));
		};
		const isPojo = x => Object.getPrototypeOf(x) === Object.prototype;

		if (Object.is(a, b)) return true;
		if (typeof a !== typeof b) return false;
		if (typeof a !== 'object') return false;
		if (a === null || b === null) return false;
		if (Array.isArray(a)) return Array.isArray(b) && arrayEqual(a, b, simpleEqual);
		if (isPojo(a)) return isPojo(b) && pojoEqual(a, b, simpleEqual);
		return false;
	};

	const PLUGIN_NAME = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const POSITION = parsePosition(PARAMS["Position"]);
	const RAW_PICTURE_LIST = parsePictureArray(PARAMS["PictureList"]);
	const REACTION_CONDITIONS = parseReactionConditionArray(PARAMS["ReactionConditions"]);
	const ACTION_CONDITIONS = parseActionConditionArray(PARAMS["ActionConditions"]);
	const SWITCH_CONDITIONS = parseSwitchConditionArray(PARAMS["SwitchConditions"]);
	const VARIABLE_CONDITIONS = parseVariableConditionArray(PARAMS["VariableConditions"]);
	const STATE_CONDITIONS = parseStateConditionArray(PARAMS["StateConditions"]);
	const HP_CONDITIONS = parseHpConditionArray(PARAMS["HpConditions"]);

	const CONDITION_LIST = [
		...REACTION_CONDITIONS,
		...ACTION_CONDITIONS,
		...SWITCH_CONDITIONS,
		...VARIABLE_CONDITIONS,
		...STATE_CONDITIONS,
		...HP_CONDITIONS,
	];
	const PICTURE_LIST = sortPictures(RAW_PICTURE_LIST, CONDITION_LIST);

	const USE_REACTION = REACTION_CONDITIONS.length !== 0;
	const USE_ACTION = ACTION_CONDITIONS.length !== 0;
	const USE_STATES = STATE_CONDITIONS.length !== 0;
	const USE_HP = HP_CONDITIONS.length !== 0;

	class BattleLeaderPictureSprite extends Sprite {
		constructor() {
			super(null);

			this._props = undefined;
			this._picture = undefined;
			this._nextBitmap = undefined;
		}

		update() {
			super.update();

			this.updateBitmap();
		}

		updateBitmap() {
			const props = this.makeProps(this._props);
			if (!simpleEqual(this._props, props)) {
				this._props = props;

				const picture = this.selectPicture(props);
				if (this._picture !== picture) {
					this._picture = picture;
					this._nextBitmap = this.loadBitmap(picture);
				}
			}

			const nextBitmap = this._nextBitmap;
			if (nextBitmap !== undefined && nextBitmap.isReady()) {
				this.bitmap = nextBitmap;
				this._nextBitmap = undefined;
			}
		}

		makeProps(prevProps) {
			const leader = $gameParty.leader();
			if (leader.battlePictureLocked()) {
				return prevProps;
			} else if (leader !== undefined) {
				const reaction = USE_REACTION ? leader.pictureReactionState() : undefined;
				const action = USE_ACTION ? leader.pictureActionState() : undefined;
				const states = USE_STATES ? leader.states().map(s => s.id) : undefined;
				const hp = USE_HP ? Math.ceil(leader.hp * 100 / leader.mhp) : undefined;
				const data = { reaction, action, states, hp };
				const conditions = this.makeConditionTable(data);
				return { conditions };
			} else {
				return undefined;
			}
		}

		makeConditionTable(data) {
			return new Map(CONDITION_LIST.map(cond => [cond.name, this.isConditionSatisfied(cond, data)]));
		}

		isConditionSatisfied(condition, data) {
			switch (condition.type) {
				case 'reaction': return this.isReactionConditionSatisfied(condition, data.reaction);
				case 'action': return this.isActionConditionSatisfied(condition, data.action);
				case 'switch': return this.isSwitchConditionSatisfied(condition);
				case 'variable': return this.isVariableConditionSatisfied(condition);
				case 'state': return this.isStateConditionSatisfied(condition, data.states);
				case 'hp': return this.isHpConditionSatisfied(condition, data.hp);
				default: throw new Error(`invalid condition type: ${condition.type}`);
			}
		}

		isReactionConditionSatisfied(condition, reaction) {
			const { id } = condition;
			if (id !== "") {
				return reaction === id;
			} else {
				throw new Error(`condition reaction not set`);
			}
		}

		isActionConditionSatisfied(condition, action) {
			const { id } = condition;
			if (id !== "") {
				return action === id;
			} else {
				throw new Error(`condition action not set`);
			}
		}

		isSwitchConditionSatisfied(condition) {
			const { id, value } = condition;
			if (id !== 0) {
				return $gameSwitches.value(id) === value;
			} else {
				throw new Error(`condition switch not set`);
			}
		}

		isVariableConditionSatisfied(condition) {
			const { id, operator, value } = condition;
			if (id !== 0) {
				const n = $gameVariables.value(id);
				switch (operator) {
					case 'eq': return n === value;
					case 'ge': return n >= value;
					case 'le': return n <= value;
					case 'gt': return n > value;
					case 'lt': return n < value;
					case 'ne': return n !== value;
					default: throw new Error(`invalid operator: ${operator}`);
				}
			} else {
				throw new Error(`condition variable not set`);
			}
		}

		isStateConditionSatisfied(condition, states) {
			const { id } = condition;
			if (id !== 0) {
				return states.includes(id);
			} else {
				throw new Error(`condition state not set`);
			}
		}

		isHpConditionSatisfied(condition, hp) {
			return hp <= condition.threshold;
		}

		selectPicture(props) {
			if (props !== undefined) {
				const { conditions } = props;
				return PICTURE_LIST.find(picture => picture.conditions.every(name => conditions.get(name)));
			} else {
				return undefined;
			}
		}

		loadBitmap(picture) {
			if (picture !== undefined) {
				return ImageManager.loadPicture(picture.file);
			} else {
				return ImageManager.loadEmptyBitmap();
			}
		}
	}

	Game_Actor.prototype.battlePictureLocked = function () {
		return this._battlePictureLocked !== undefined;
	};

	Game_Actor.prototype.setBattlePictureLocked = function (value) {
		this._battlePictureLocked = value ? true : undefined;
	};

	Game_Actor.prototype.onBeforeBattleEnd = function () {
		this.setBattlePictureLocked(true);
	};

	const Game_Actor_onBattleEnd = __base(Game_Actor.prototype, "onBattleEnd");
	Game_Actor.prototype.onBattleEnd = function () {
		Game_Actor_onBattleEnd.apply(this, arguments);

		this.setBattlePictureLocked(false);
	};

	Game_Party.prototype.onBeforeBattleEnd = function () {
		for (const member of this.members()) {
			member.onBeforeBattleEnd();
		}
	};

	const Spriteset_Battle_createUpperLayer = __base(Spriteset_Battle.prototype, "createUpperLayer");
	Spriteset_Battle.prototype.createUpperLayer = function () {
		this.createBattleLeaderPicture();

		Spriteset_Battle_createUpperLayer.apply(this, arguments);
	};

	Spriteset_Battle.prototype.createBattleLeaderPicture = function () {
		const { origin, anchor, offset } = POSITION;
		const sprite = new BattleLeaderPictureSprite();
		sprite.anchor.x = anchor.x;
		sprite.anchor.y = anchor.y;
		sprite.x = Math.round(Graphics.width * origin.x) + offset.x;
		sprite.y = Math.round(Graphics.height * origin.y) + offset.y;

		this.addChild(sprite);
	};

	const Scene_Battle_stop = Scene_Battle.prototype.stop;
	Scene_Battle.prototype.stop = function () {
		Scene_Battle_stop.apply(this, arguments);

		$gameParty.onBeforeBattleEnd();
	};

	if (USE_REACTION) {
		const Game_Action_apply = Game_Action.prototype.apply;
		Game_Action.prototype.apply = function (target) {
			Game_Action_apply.apply(this, arguments);

			const result = target.result();
			if (this.isSkill()) {
				result.pictureReaction = parseSkillReactionTag(this.item().meta);
			} else if (this.isItem()) {
				result.pictureReaction = parseItemReactionTag(this.item().meta);
			}
		};

		const Game_ActionResult_clear = Game_ActionResult.prototype.clear;
		Game_ActionResult.prototype.clear = function () {
			Game_ActionResult_clear.apply(this, arguments);

			this.pictureReaction = undefined;
		};

		Game_Actor.prototype.pictureReactionState = function () {
			return this._pictureReactionState;
		};

		const Game_Actor_requestMotionRefresh = __base(Game_Actor.prototype, "requestMotionRefresh");
		Game_Actor.prototype.requestMotionRefresh = function () {
			Game_Actor_requestMotionRefresh.apply(this, arguments);

			this._pictureReactionState = undefined;
		};

		const Game_Actor_performVictory = Game_Actor.prototype.performVictory;
		Game_Actor.prototype.performVictory = function () {
			Game_Actor_performVictory.apply(this, arguments);

			this._pictureReactionState = VICTORY_REACTION_ID;
		};

		Game_Actor.prototype.performPictureReaction = function (reaction) {
			this._pictureReactionState = reaction;
		};

		const Game_Actor_onBattleEnd = __base(Game_Actor.prototype, "onBattleEnd");
		Game_Actor.prototype.onBattleEnd = function () {
			Game_Actor_onBattleEnd.apply(this, arguments);

			this._pictureReactionState = undefined;
		};

		const Window_BattleLog_displayDamage = Window_BattleLog.prototype.displayDamage;
		Window_BattleLog.prototype.displayDamage = function (target) {
			const result = target.result();
			if (target.isActor() && result.isHit()) {
				target.setBattlePictureLocked(true);
				this.push("performPictureReaction", target, result.pictureReaction);
			}

			Window_BattleLog_displayDamage.apply(this, arguments);
		};

		Window_BattleLog.prototype.performPictureReaction = function (target, reaction) {
			target.setBattlePictureLocked(false);
			target.performPictureReaction(reaction);
		};
	}

	if (USE_ACTION) {
		Game_Actor.prototype.pictureActionState = function () {
			return this._pictureActionState;
		};

		const Game_Actor_performAction = Game_Actor.prototype.performAction;
		Game_Actor.prototype.performAction = function (action) {
			Game_Actor_performAction.apply(this, arguments);

			if (action.isSkill()) {
				this._pictureActionState = parseSkillActionTag(action.item().meta);
			} else if (action.isItem()) {
				this._pictureActionState = parseItemActionTag(action.item().meta);
			}
		};

		const Game_Actor_performActionEnd = Game_Actor.prototype.performActionEnd;
		Game_Actor.prototype.performActionEnd = function () {
			Game_Actor_performActionEnd.apply(this, arguments);

			this._pictureActionState = undefined;
		};

		const Game_Actor_onBattleEnd = __base(Game_Actor.prototype, "onBattleEnd");
		Game_Actor.prototype.onBattleEnd = function () {
			Game_Actor_onBattleEnd.apply(this, arguments);

			this._pictureActionState = undefined;
		};
	}
}