/*:
 * @plugindesc 変数やパーティリーダーの状態を表示するシーンを実装します。
 * @author F_
 * 
 * @help
 * 
 * 変数やパーティリーダーの状態を表示するシーンを実装します。
 * 
 * プラグイン導入時、メニュー画面にシーンへと遷移するコマンドが追加されます。
 * 
 * 
 * 
 * ■ シーンの構成要素
 * 
 * シーンには次の内容を自由に配置することができます。
 * 
 * * ウィンドウ　　：デフォルトスキンのウィンドウ
 * * ピクチャ　　　：状態によって自動的に画像が切り替わるピクチャ
 * * 固定テキスト　：常に同一内容を表示するテキスト
 * * 状態テキスト　：変数値によって内容が切り替わるテキスト
 * * 変数テキスト　：変数値に接頭語および接尾語を付加して表示するテキスト
 * * 変数ブロック　：変数名と変数値の表
 * 
 * これらの構成要素はプラグインパラメータから設定できます。
 * 
 * 
 * 
 * ■ スタイルの設定
 * 
 * テキストを表示する構成要素ではスタイルを設定することができます。
 * スタイルは文字の大きさや色などテキストの描画方法を決定します。
 * 
 * スタイルは予め一意な名前で定義し、各構成要素にはその名前によって関連付けます。
 * 
 * 
 * 
 * ■ ピクチャの設定
 * 
 * ピクチャには表示する画像の候補とそれぞれの画像を表示する条件を設定します。
 * 各画像候補の内、条件を満たす最も優先順位の高い画像が表示されます。
 * 表示する画像ファイルは img/pictures/ 以下に配置する必要があります。
 * 
 * 各画像候補に設定可能な条件は次の通りです。
 * 
 * スイッチ条件　：スイッチの値に関する条件
 * 変数条件　　　：変数の値に関する条件
 * ステート条件　：付加されているステートに関する条件
 * HP条件　　　　：残りHPに関する条件
 * 
 * 各条件は予め一意な名前で定義し、各画像候補にはその名前によって関連付けます。
 * 
 * 各条件は優先度の設定およびその種類や値などによって自動的に優先順位が付き、
 * 各画像候補は設定された条件の優先順位に従って自動的に優先順位が付きます。
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
 * ■ 付録：ピクチャの優先順位の詳細
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
 *    スイッチ条件 > 変数条件 > ステート条件 > HP条件
 * 3. 各条件の種類によって優先条件を決定する。
 *   3.1. スイッチ条件の場合
 *     3.1.1. よりIDの小さなスイッチの条件が優先される。
 *     3.1.2. 値が異なる場合、OFFの条件が優先される。
 *   3.2. 変数条件の場合
 *     3.2.1. よりIDの小さな変数の条件が優先される。
 *     3.2.2. 演算子に対する次の比較によって優先される条件を決定する。
 *            "＝" > "≧" > "≦" > "＞" > "＜" > "≠"
 *     3.2.3. 比較値によって優先条件を決定する。
 *       3.2.3.1 演算子が"≧"か"＞"の場合、より比較値が大きな条件が優先される。
 *       3.2.3.2 演算子がそれ以外の場合、より比較値が小さな条件が優先される。
 *   3.3. ステート条件の場合
 *     3.3.1. よりIDの小さなステートの条件が優先される。
 *   3.4. HP条件の場合
 *     3.4.1. より閾値の小さな条件が優先される。
 * 4. 手順3により決定しない場合、辞書順で小さな条件名の条件が優先される。
 * 
 * @param CommandSymbol
 * @type string
 * @default second-status
 * @text コマンドシンボル
 * @desc メニュー画面に表示するコマンドのシンボル。
 * 
 * @param CommandName
 * @type string
 * @default サブステータス
 * @text コマンド名
 * @desc メニュー画面に表示するコマンドの名前。
 * 
 * @param BackgroundImage
 * @type file
 * @dir img/system/
 * @require 1
 * @text 背景画像
 * @desc シーンの背景画像。
 * 
 * @param WindowList
 * @type struct<Window>[]
 * @default []
 * @text ウィンドウリスト
 * @desc 画面に表示するウィンドウのリスト。
 * 
 * @param PictureList
 * @type struct<Picture>[]
 * @default []
 * @text ピクチャリスト
 * @desc 画面に表示するピクチャのリスト。
 * 
 * @param PlainTextList
 * @type struct<PlainText>[]
 * @default []
 * @text 固定テキストリスト
 * @desc 画面に表示する固定テキストのリスト。
 * 
 * @param StateTextList
 * @type struct<StateText>[]
 * @default []
 * @text 状態テキストリスト
 * @desc 画面に表示する状態テキストのリスト。
 * 
 * @param VariableTextList
 * @type struct<VariableText>[]
 * @default []
 * @text 変数テキストリスト
 * @desc 画面に表示する変数テキストのリスト。
 * 
 * @param VariableTableList
 * @type struct<VariableTable>[]
 * @default []
 * @text 変数ブロックリスト
 * @desc 画面に表示する変数ブロックのリスト。
 * 
 * @param StyleList
 * @type struct<Style>[]
 * @default []
 * @text スタイルリスト
 * @desc テキストの表示形式のリスト。
 * 
 * @param AdvancedSettings
 * @type struct<AdvancedSettings>
 * @default {"textPadding":"6"}
 * @text 詳細設定
 * @desc 詳細な表示設定。
 */

/*~struct~Window:
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc ウィンドウの基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせるウィンドウ上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param width
 * @type number
 * @default 0
 * @text 横幅
 * @desc ウィンドウの横幅(px)。
 * 
 * @param height
 * @type number
 * @default 0
 * @text 縦幅
 * @desc ウィンドウの縦幅(px)。
 */

/*~struct~Picture:
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc ピクチャの基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせるピクチャ上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param entries
 * @type struct<PictureEntry>[]
 * @default []
 * @text 画像リスト
 * @desc 表示画像のリスト。
 * 
 * @param switchConditions
 * @type struct<SwitchCondition>[]
 * @default []
 * @text スイッチ条件
 * @desc スイッチ条件の定義。
 * 
 * @param variableConditions
 * @type struct<VariableCondition>[]
 * @default []
 * @text 変数条件
 * @desc 変数条件の定義。
 * 
 * @param stateConditions
 * @type struct<StateCondition>[]
 * @default []
 * @text ステート条件
 * @desc ステート条件の定義。
 * 
 * @param hpConditions
 * @type struct<HpCondition>[]
 * @default []
 * @text HP条件
 * @desc HP条件の定義。
 */

/*~struct~PictureEntry:
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

/*~struct~PlainText:
 * @param note
 * @type string
 * @text メモ
 * @desc 編集用のメモ。挙動への影響はなし。
 * 
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc テキストの基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせるテキスト上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param maxWidth
 * @type number
 * @default 0
 * @text 最大幅
 * @desc テキストの最大幅(px)。
 * 最大幅を制限しない場合は0を指定。
 * 
 * @param style
 * @type string
 * @default default
 * @text スタイル
 * @desc テキスト描画に使用するスタイルの名前。
 * 
 * @param text
 * @type string
 * @text 表示テキスト
 * @desc 表示するテキスト。
 */

/*~struct~StateText:
 * @param note
 * @type string
 * @text メモ
 * @desc 編集用のメモ。挙動への影響はなし。
 * 
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc テキストの基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせるテキスト上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param maxWidth
 * @type number
 * @default 0
 * @text 最大幅
 * @desc テキストの最大幅(px)。
 * 最大幅を制限しない場合は0を指定。
 * 
 * @param style
 * @type string
 * @default default
 * @text スタイル
 * @desc テキストに適用するスタイルの名前。
 * 
 * @param variableId
 * @type variable
 * @default 0
 * @text 状態変数
 * @desc 表示テキストを決定する変数。
 * 
 * @param entries
 * @type struct<StateTextEntry>[]
 * @default []
 * @text テキストリスト
 * @desc 表示テキストのリスト。
 */

/*~struct~StateTextEntry:
 * @param value
 * @type number
 * @default 0
 * @text 変数値
 * @desc テキストに対応する変数値。
 * 
 * @param text
 * @type string
 * @text 表示テキスト
 * @desc 表示するテキスト。
 */

/*~struct~VariableText:
 * @param note
 * @type string
 * @text メモ
 * @desc 編集用のメモ。挙動への影響はなし。
 * 
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc テキストの基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせるテキスト上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param maxWidth
 * @type number
 * @default 0
 * @text 最大幅
 * @desc テキストの最大幅(px)。
 * 最大幅を制限しない場合は0を指定。
 * 
 * @param style
 * @type string
 * @default default
 * @text スタイル
 * @desc テキストに適用するスタイルの名前。
 * 
 * @param variableId
 * @type variable
 * @default 0
 * @text 表示変数
 * @desc 表示対象の変数。
 * 
 * @param template
 * @type string
 * @default {}
 * @text 表示雛形
 * @desc 表示するテキストの雛形（例："計{0000}回"）。
 * {}内は内側の0と同数の最小桁数で変数値に置換。
 */

/*~struct~VariableTable:
 * @param note
 * @type string
 * @text メモ
 * @desc 編集用のメモ。挙動への影響はなし。
 * 
 * @param position
 * @type struct<Position>
 * @default {"x":"0","y":"0"}
 * @text 表示位置
 * @desc 表の基準位置の座標(px)。
 * 
 * @param anchor
 * @type struct<Anchor>
 * @default {"x":"0","y":"0"}
 * @text 基準位置
 * @desc 表示位置に合わせる表上の位置(%)。
 * 左端または上端を0%、右端または下端を100%とする百分率。
 * 
 * @param labelWidth
 * @type number
 * @default 0
 * @text 変数名の表示幅
 * @desc 変数名を表示する列の幅(px)。
 * 
 * @param valueWidth
 * @type number
 * @default 0
 * @text 変数値の表示幅
 * @desc 変数値を表示する列の幅(px)。
 * 
 * @param style
 * @type string
 * @default default
 * @text スタイル
 * @desc 表に適用するスタイルの名前。
 * 
 * @param variables
 * @type variable[]
 * @default []
 * @text 表示変数リスト
 * @desc 表示対象の変数のリスト。
 * 
 * @param template
 * @type string
 * @default {}
 * @text 表示雛形
 * @desc 表示する変数値テキストの雛形（例："計{0000}回"）。
 * {}内は内側の0と同数の最小桁数で変数値に置換。
 */

/*~struct~Style:
 * @param id
 * @type string
 * @text スタイル名
 * @desc スタイルの一意な名前。
 * 
 * @param lineHeight
 * @type number
 * @default 36
 * @text 行の高さ
 * @desc 行の高さ(px)。
 * 
 * @param fontSize
 * @type number
 * @default 28
 * @text フォントサイズ
 * @desc フォントサイズ(px)。
 * 
 * @param textColor
 * @type string
 * @default white
 * @text 文字色
 * @desc 文字色(CSS <color>)。
 * 
 * @param outlineColor
 * @type string
 * @default rgba(0, 0, 0, 0.5)
 * @text アウトラインの色
 * @desc アウトラインの色(CSS <color>)。
 * 
 * @param outlineWidth
 * @type number
 * @default 4
 * @text アウトラインの太さ
 * @desc アウトラインの太さ(px)。
 */

/*~struct~Position:
 * @param x
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text x
 * @desc x座標。
 * 
 * @param y
 * @type number
 * @min -9999
 * @max 9999
 * @default 0
 * @text y
 * @desc y座標。
 */

/*~struct~Anchor:
 * @param x
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text x
 * @desc x方向の位置。
 * 
 * @param y
 * @type number
 * @min 0
 * @max 100
 * @default 0
 * @text y
 * @desc y方向の位置。
 */

/*~struct~AdvancedSettings:
 * @param textPadding
 * @type number
 * @default 6
 * @text テキストパディング
 * @desc テキスト左右の空白の幅(px)。
 */

"use strict";

{
	const DEFAULT_STYLE = {
		id: "default",
		lineHeight: 36,
		fontSize: 28,
		textColor: "white",
		outlineColor: "rgba(0, 0, 0, 0.5)",
		outlineWidth: 4,
	};

	const parseArray = parser => s => JSON.parse(s).map(si => parser(si));

	const parseStringArray = parseArray(s => s);

	const parseInteger = s => Number.parseInt(s, 10);

	const parseIntegerArray = parseArray(parseInteger);

	const parseBoolean = s => {
		switch (s) {
			case "false": return false;
			case "true": return true;
			default: throw new Error(`invalid boolean value: ${s}`);
		}
	};

	const parseWindow = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "width": return parseInteger(value);
			case "height": return parseInteger(value);
			default: throw new Error(`invalid Window property: ${key}`);
		}
	});

	const parseWindowArray = parseArray(parseWindow);

	const parsePicture = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return convertPicture(value);
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "entries": return parsePictureEntryArray(value);
			case "switchConditions": return parseSwitchConditionArray(value);
			case "variableConditions": return parseVariableConditionArray(value);
			case "stateConditions": return parseStateConditionArray(value);
			case "hpConditions": return parseHpConditionArray(value);
			default: throw new Error(`invalid Picture property: ${key}`);
		}
	});

	const convertPicture = picture => {
		const { switchConditions, variableConditions, stateConditions, hpConditions, ...rest } = picture;
		const conditions = [
			...switchConditions,
			...variableConditions,
			...stateConditions,
			...hpConditions,
		];
		const entries = sortPictureEntries(rest.entries, conditions);
		return { ...rest, entries, conditions };
	};

	const parsePictureArray = parseArray(parsePicture);

	const parsePictureEntry = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "file": return value;
			case "conditions": return parseStringArray(value);
			default: throw new Error(`invalid PictureEntry property: ${key}`);
		}
	});

	const parsePictureEntryArray = parseArray(parsePictureEntry);

	const parseSwitchCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'switch', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return parseInteger(value);
			case "value": return parseBoolean(value);
			default: throw new Error(`invalid SwitchCondition property: ${key}`);
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
			default: throw new Error(`invalid VariableCondition property: ${key}`);
		}
	});

	const parseVariableConditionArray = parseArray(parseVariableCondition);

	const parseStateCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'state', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "id": return parseInteger(value);
			default: throw new Error(`invalid StateCondition property: ${key}`);
		}
	});

	const parseStateConditionArray = parseArray(parseStateCondition);

	const parseHpCondition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return { type: 'hp', ...value };
			case "name": return value;
			case "priority": return parseInteger(value);
			case "threshold": return parseInteger(value);
			default: throw new Error(`invalid HpCondition property: ${key}`);
		}
	});

	const parseHpConditionArray = parseArray(parseHpCondition);

	const parsePlainText = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "note": return undefined;
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "maxWidth": return parseInteger(value);
			case "style": return value;
			case "text": return value;
			default: throw new Error(`invalid PlainText property: ${key}`);
		}
	});

	const parsePlainTextArray = parseArray(parsePlainText);

	const parseStateText = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "note": return undefined;
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "maxWidth": return parseInteger(value);
			case "style": return value;
			case "variableId": return parseInteger(value);
			case "entries": return parseStateTextEntryArray(value);
			default: throw new Error(`invalid StateText property: ${key}`);
		}
	});

	const parseStateTextArray = parseArray(parseStateText);

	const parseStateTextEntry = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "value": return parseInteger(value);
			case "text": return value;
			default: throw new Error(`invalid StateTextEntry property: ${key}`);
		}
	});

	const parseStateTextEntryArray = parseArray(parseStateTextEntry);

	const parseVariableText = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "note": return undefined;
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "maxWidth": return parseInteger(value);
			case "style": return value;
			case "variableId": return parseInteger(value);
			case "template": return parseVariableTemplate(value);
			default: throw new Error(`invalid VariableText property: ${key}`);
		}
	});

	const parseVariableTextArray = parseArray(parseVariableText);

	const parseVariableTable = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "note": return undefined;
			case "position": return parsePosition(value);
			case "anchor": return parseAnchor(value);
			case "labelWidth": return parseInteger(value);
			case "valueWidth": return parseInteger(value);
			case "style": return value;
			case "variables": return parseIntegerArray(value);
			case "template": return parseVariableTemplate(value);
			default: throw new Error(`invalid VariableTable property: ${key}`);
		}
	});

	const parseVariableTableArray = parseArray(parseVariableTable);

	const parseVariableTemplate = s => {
		const match = s.match(/\{\s*(0*)\s*\}/);
		if (match !== null) {
			const [$0, $1] = match;
			const start = match.index;
			const end = start + $0.length;
			const digits = $1.length;
			const prefix = s.slice(0, start);
			const suffix = s.slice(end);
			return { digits, prefix, suffix };
		} else {
			throw new Error(`{} placeholder not found: ${s}`);
		}
	};

	const parseStyle = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "id": return value;
			case "lineHeight": return parseInteger(value);
			case "fontSize": return parseInteger(value);
			case "textColor": return value;
			case "outlineColor": return value;
			case "outlineWidth": return parseInteger(value);
			default: throw new Error(`invalid Style property: ${key}`);
		}
	});

	const parseStyleArray = parseArray(parseStyle);

	const parsePosition = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "x": return parseInteger(value);
			case "y": return parseInteger(value);
			default: throw new Error(`invalid Position property: ${key}`);
		}
	});

	const parseAnchor = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "x": return parseInteger(value) / 100;
			case "y": return parseInteger(value) / 100;
			default: throw new Error(`invalid Anchor property: ${key}`);
		}
	});

	const parseAdvancedSettings = s => JSON.parse(s, (key, value) => {
		switch (key) {
			case "": return value;
			case "textPadding": return parseInteger(value);
			default: throw new Error(`invalid AdvancedSettings property: ${key}`);
		}
	});

	const pipe = (...args) => args.reduce((acc, fn) => fn(acc));

	const sortPictureEntries = (entries, conditions) => {
		const prioritizer = makeConditionPrioritizer(conditions);
		const toPriorityList = new Map(entries.map(entry => [
			entry,
			entry.conditions.map(prioritizer).sort((a, b) => a - b),
		]));
		return entries.slice().sort(comparePictureEntries(toPriorityList));
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

	const comparePictureEntries = map => (a, b) => comparePriorityLists(map.get(a), map.get(b));

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
			case 'switch': return compareSwitchConditions(a, b);
			case 'variable': return compareVariableConditions(a, b);
			case 'state': return compareStateConditions(a, b);
			case 'hp': return compareHpConditions(a, b);
			default: throw new Error(`invalid condition type: ${type}`);
		}
	};

	const compareConditionName = (a, b) => compareStrings(a.name, b.name);

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

	const PLUGIN_NAME = document.currentScript.src.split("/").pop().replace(/\.js$/, "");
	const PARAMS = PluginManager.parameters(PLUGIN_NAME);
	const COMMAND_SYMBOL = PARAMS["CommandSymbol"];
	const COMMAND_NAME = PARAMS["CommandName"];
	const BACKGROUND_IMAGE = PARAMS["BackgroundImage"];
	const WINDOW_LIST = parseWindowArray(PARAMS["WindowList"]);
	const PICTURE_LIST = parsePictureArray(PARAMS["PictureList"]);
	const PLAIN_TEXT_LIST = parsePlainTextArray(PARAMS["PlainTextList"]);
	const STATE_TEXT_LIST = parseStateTextArray(PARAMS["StateTextList"]);
	const VARIABLE_TEXT_LIST = parseVariableTextArray(PARAMS["VariableTextList"]);
	const VARIABLE_TABLE_LIST = parseVariableTableArray(PARAMS["VariableTableList"]);
	const STYLE_LIST = parseStyleArray(PARAMS["StyleList"]);
	const { textPadding: TEXT_PADDING } = parseAdvancedSettings(PARAMS["AdvancedSettings"]);

	const findStyle = id => {
		const style = STYLE_LIST.find(style => style.id === id);
		if (style !== undefined) {
			return style;
		} else if (id === 'default') {
			return DEFAULT_STYLE;
		} else {
			throw new Error(`style "${id}" not found`);
		}
	};

	const applyStyle = (bitmap, style) => {
		const { fontSize, textColor, outlineColor, outlineWidth } = style;
		Object.assign(bitmap, { fontSize, textColor, outlineColor, outlineWidth });
	};

	const measureText = (() => {
		const bitmap = new Bitmap(1, 1);
		return (text, style) => {
			applyStyle(bitmap, style);
			return Math.ceil(bitmap.measureTextWidth(text));
		};
	})();

	const measureTemplate = (template, style) => {
		const { digits, prefix, suffix } = template;
		const digitsWidth = measureText("0".repeat(digits), style);
		const prefixWidth = measureText(prefix, style);
		const suffixWidth = measureText(suffix, style);
		const totalWidth = prefixWidth + digitsWidth + suffixWidth;
		return { digitsWidth, prefixWidth, suffixWidth, totalWidth };
	};

	const measureArea = (contentWidth, maxWidth, style) => {
		const padding = TEXT_PADDING;
		const rawWidth = contentWidth + padding * 2;
		const width = maxWidth !== 0 ? Math.min(rawWidth, maxWidth) : rawWidth;
		const innerWidth = Math.max(width - padding * 2, 0);
		const height = style.lineHeight;
		return { width, height, innerWidth, padding };
	};

	const measureCellArea = (width, style) => {
		const padding = TEXT_PADDING;
		const innerWidth = Math.max(width - padding * 2, 0);
		const height = style.lineHeight;
		return { width, height, innerWidth, padding };
	};

	const drawText = (bitmap, text, metrics, x, y, align = 'left') => {
		const { height, innerWidth, padding } = metrics;
		bitmap.drawText(text, x + padding, y, innerWidth, height, align);
	};

	const drawTemplate = (bitmap, value, template, areaMetrics, templateMetrics, x, y) => {
		const { digits, prefix, suffix } = template;
		const { height, innerWidth, padding } = areaMetrics;
		const { digitsWidth, prefixWidth, suffixWidth, totalWidth } = adjustTemplateWidth(areaMetrics, templateMetrics);
		const valueText = value.toString(10);
		const valuePadding = digits - valueText.length;
		if (valuePadding >= 0) {
			const valuePaddingWidth = Math.floor(digitsWidth * valuePadding / digits);
			const x0 = x + padding + innerWidth - totalWidth;
			const x1 = x0 + prefixWidth;
			const x2 = x1 + valuePaddingWidth;
			const x3 = x1 + digitsWidth;
			const x4 = x3 + suffixWidth;
			bitmap.drawText(prefix, x0, y, x1 - x0, height, 'left');
			bitmap.drawText(suffix, x3, y, x4 - x3, height, 'left');
			bitmap.drawText(value.toString(10), x2, y, x3 - x2, height, 'right');
		} else {
			const text = prefix + valueText + suffix;
			drawText(bitmap, text, areaMetrics, x, y, 'right');
		}
	};

	const adjustTemplateWidth = (areaMetrics, templateMetrics) => {
		const scale = areaMetrics.innerWidth / templateMetrics.totalWidth;
		if (scale < 1) {
			const digitsWidth = Math.floor(templateMetrics.digitsWidth * scale);
			const prefixWidth = Math.floor(templateMetrics.prefixWidth * scale);
			const suffixWidth = Math.floor(templateMetrics.suffixWidth * scale);
			const totalWidth = prefixWidth + digitsWidth + suffixWidth;
			return { digitsWidth, prefixWidth, suffixWidth, totalWidth };
		} else {
			return templateMetrics;
		}
	};

	const createTextBitmap = (text, maxWidth, styleId) => {
		const style = findStyle(styleId);
		const contentWidth = measureText(text, style);
		const metrics = measureArea(contentWidth, maxWidth, style);
		const bitmap = new Bitmap(metrics.width, metrics.height);
		applyStyle(bitmap, style);
		drawText(bitmap, text, metrics, 0, 0);
		return bitmap;
	};

	const createTemplateBitmap = (value, template, maxWidth, styleId) => {
		const style = findStyle(styleId);
		const templateMetrics = measureTemplate(template, style);
		const areaMetrics = measureArea(templateMetrics.totalWidth, maxWidth, style);
		const bitmap = new Bitmap(areaMetrics.width, areaMetrics.height);
		applyStyle(bitmap, style);
		drawTemplate(bitmap, value, template, areaMetrics, templateMetrics, 0, 0);
		return bitmap;
	};

	class Window extends Window_Base {
		createContents() { }
	}

	class Picture extends Sprite {
		initialize(config) {
			super.initialize(this.loadBitmap(config));
		}

		loadBitmap(config) {
			const { entries, conditions } = config;
			const data = this.makeConditionData();
			if (data !== undefined) {
				const table = this.makeConditionTable(conditions, data);
				const entry = this.selectEntry(entries, table);
				return ImageManager.loadPicture(entry.file);
			} else {
				return null;
			}
		}

		makeConditionData() {
			const leader = $gameParty.leader();
			if (leader !== undefined) {
				const states = leader.states().map(s => s.id);
				const hp = Math.ceil(leader.hp * 100 / leader.mhp);
				return { states, hp };
			} else {
				return undefined;
			}
		}

		makeConditionTable(conditions, data) {
			return new Map(conditions.map(cond => [cond.name, this.isConditionSatisfied(cond, data)]));
		}

		isConditionSatisfied(condition, data) {
			switch (condition.type) {
				case 'switch': return this.isSwitchConditionSatisfied(condition);
				case 'variable': return this.isVariableConditionSatisfied(condition);
				case 'state': return this.isStateConditionSatisfied(condition, data.states);
				case 'hp': return this.isHpConditionSatisfied(condition, data.hp);
				default: throw new Error(`invalid condition type: ${condition.type}`);
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

		selectEntry(entries, table) {
			return entries.find(entry => entry.conditions.every(name => table.get(name)));
		}
	}

	class PlainText extends Sprite {
		initialize(config) {
			super.initialize(this.createBitmap(config));
		}

		createBitmap(config) {
			const { maxWidth, style, text } = config;
			return createTextBitmap(text, maxWidth, style);
		}
	}

	class StateText extends Sprite {
		initialize(config) {
			super.initialize(this.createBitmap(config));
		}

		createBitmap(config) {
			const { maxWidth, style, variableId, entries } = config;
			const text = this.selectText(entries, variableId);
			return createTextBitmap(text, maxWidth, style);
		}

		selectText(entries, variableId) {
			if (variableId !== 0) {
				const value = $gameVariables.value(variableId);
				const entry = entries.find(entry => entry.value === value);
				return entry !== undefined ? entry.text : "";
			} else {
				throw new Error(`state text variable not set`);
			}
		}
	}

	class VariableText extends Sprite {
		initialize(config) {
			super.initialize(this.createBitmap(config));
		}

		createBitmap(config) {
			const { maxWidth, style, variableId, template } = config;
			const value = this.variableValue(variableId);
			return createTemplateBitmap(value, template, maxWidth, style);
		}

		variableValue(variableId) {
			if (variableId !== 0) {
				return $gameVariables.value(variableId);
			} else {
				throw new Error(`variable text variable not set`);
			}
		}
	}

	class VariableTable extends Sprite {
		initialize(config) {
			super.initialize(this.createBitmap(config));
		}

		createBitmap(config) {
			const style = findStyle(config.style);
			const bitmap = this.newBitmap(config, style);
			this.drawTable(bitmap, config, style);
			return bitmap;
		}

		newBitmap(config, style) {
			const { labelWidth, valueWidth, variables } = config;
			const { lineHeight } = style;
			const width = labelWidth + valueWidth;
			const height = lineHeight * variables.length;
			return new Bitmap(width, height);
		}

		drawTable(bitmap, config, style) {
			const { labelWidth, valueWidth, variables, template } = config;
			const { lineHeight } = style;

			const labelAreaMetrics = measureCellArea(labelWidth, style);
			const valueAreaMetrics = measureCellArea(valueWidth, style);
			const templateMetrics = measureTemplate(template, style);

			applyStyle(bitmap, style);
			for (const [index, variableId] of variables.entries()) {
				const { label, value } = this.variableRecord(variableId);
				const labelX = 0;
				const valueX = labelX + labelWidth;
				const y = lineHeight * index;
				drawText(bitmap, label, labelAreaMetrics, labelX, y);
				drawTemplate(bitmap, value, template, valueAreaMetrics, templateMetrics, valueX, y);
			}
		}

		variableRecord(variableId) {
			if (variableId !== 0) {
				const label = $dataSystem.variables[variableId];
				const value = $gameVariables.value(variableId);
				return { label, value };
			} else {
				throw new Error(`variable table variable not set`);
			}
		}
	}

	class SecondStatusScene extends Scene_Base {
		create() {
			this.createBackground();
			this.createWindows();
			this.createPictures();
			this.createPlainTexts();
			this.createStateTexts();
			this.createVariableTexts();
			this.createVariableTables();
		}

		createBackground() {
			this._backgroundSprite = new Sprite();
			this._backgroundSprite.bitmap = this.loadBackgroundImage();
			this.addChild(this._backgroundSprite);
		}

		loadBackgroundImage() {
			if (BACKGROUND_IMAGE !== "") {
				return ImageManager.loadSystem(BACKGROUND_IMAGE);
			} else {
				return SceneManager.backgroundBitmap();
			}
		}

		createWindows() {
			for (const config of WINDOW_LIST) {
				const { position, anchor, width, height } = config;
				const x = position.x - Math.round(width * anchor.x);
				const y = position.y - Math.round(height * anchor.y);
				const window = new Window(x, y, width, height);
				this.addChild(window);
			}
		}

		createPictures() {
			for (const config of PICTURE_LIST) {
				const { position, anchor } = config;
				const picture = new Picture(config);
				this.locateSprite(picture, position, anchor);
				this.addChild(picture);
			}
		}

		createPlainTexts() {
			for (const config of PLAIN_TEXT_LIST) {
				const { position, anchor } = config;
				const text = new PlainText(config);
				this.locateSprite(text, position, anchor);
				this.addChild(text);
			}
		}

		createStateTexts() {
			for (const config of STATE_TEXT_LIST) {
				const { position, anchor } = config;
				const text = new StateText(config);
				this.locateSprite(text, position, anchor);
				this.addChild(text);
			}
		}

		createVariableTexts() {
			for (const config of VARIABLE_TEXT_LIST) {
				const { position, anchor } = config;
				const text = new VariableText(config);
				this.locateSprite(text, position, anchor);
				this.addChild(text);
			}
		}

		createVariableTables() {
			for (const config of VARIABLE_TABLE_LIST) {
				const { position, anchor } = config;
				const text = new VariableTable(config);
				this.locateSprite(text, position, anchor);
				this.addChild(text);
			}
		}

		locateSprite(sprite, position, anchor) {
			sprite.anchor.x = anchor.x;
			sprite.anchor.y = anchor.y;
			sprite.x = position.x;
			sprite.y = position.y;
		}

		update() {
			this.handleInput();

			super.update();
		}

		handleInput() {
			if (this.isActive()) {
				if (Input.isTriggered('cancel') || TouchInput.isCancelled()) {
					SoundManager.playCancel();
					this.popScene();
				}
			}
		}
	}

	const Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
	Window_MenuCommand.prototype.addOriginalCommands = function () {
		Window_MenuCommand_addOriginalCommands.apply(this, arguments);

		this.addCommand(COMMAND_NAME, COMMAND_SYMBOL);
	};

	const Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
	Scene_Menu.prototype.createCommandWindow = function () {
		Scene_Menu_createCommandWindow.apply(this, arguments);

		this._commandWindow.setHandler(COMMAND_SYMBOL, () => this.commandSecondStatus());
	};

	Scene_Menu.prototype.commandSecondStatus = function () {
		SceneManager.push(SecondStatusScene);
	};
}