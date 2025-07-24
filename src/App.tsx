import React, { useState } from 'react';
import { 
  Send, MessageCircle, User, Bot, HelpCircle, Lightbulb, 
  Users, TrendingUp, Heart, Star, MapPin, Calendar,
  Briefcase, GraduationCap, Award, Building, Phone, Mail
} from 'lucide-react';

// 後継者不足解消に特化した質問回答データベース
const knowledgeBase: Record<string, Record<string, string>> = {
  "大工": {
    "大工の魅力は何ですか？": "自分の手で形のあるものを作り上げる喜びと、100年以上残る建物に携われることです。現代では住宅不足もあり、需要は高まっています。",
    "大工になるにはどうすればいい？": "工務店や建設会社で見習いから始めるのが一般的です。最近は専門学校もあり、国の支援制度も充実しています。",
    "大工の収入はどのくらい？": "経験により幅がありますが、一人前になれば年収400-800万円程度。独立すれば更に上を目指せます。",
    "未経験でも大工になれる？": "もちろんです！多くの工務店が未経験者を歓迎しています。丁寧に指導してくれる親方のもとで学べます。",
    "大工の将来性は？": "住宅需要は続き、特に伝統工法ができる大工は希少価値が高いです。リフォーム需要も増加中です。",
    "女性でも大工になれる？": "はい！最近は女性大工も増えています。細かい作業が得意な女性ならではの強みもあります。",
    "大工の労働環境は？": "以前より改善され、週休2日制の会社も増えています。安全対策も徹底されています。",
    "大工修行は厳しい？": "昔ほど厳しくありません。現代は教育的な指導が主流で、働きながら技術を身につけられます。"
  },
  "農業": {
    "農業の魅力は何ですか？": "自然と向き合い、生命を育てる喜びがあります。安全な食べ物を提供し、地域を支える誇りある仕事です。",
    "農業を始めるには？": "国や自治体の新規就農支援制度があります。研修制度や補助金も充実しており、未経験でも始められます。",
    "農業の収入は？": "作物や規模により異なりますが、年収300-1000万円以上も可能です。直売や加工で収入アップも図れます。",
    "農地はどう確保する？": "農業委員会や農地バンクで紹介してもらえます。最近は貸し出し希望の農地も増えています。",
    "農業の将来性は？": "食料自給率向上が国の課題で、若い農業者への支援が手厚いです。有機農業の需要も拡大中です。",
    "農業は儲かる？": "工夫次第で十分な収入を得られます。ブランド化や6次産業化で付加価値を高める農家も多いです。",
    "農業の労働時間は？": "季節により変動しますが、自分のペースで働けるのが魅力です。休日も自由に設定できます。",
    "農業に必要な資格は？": "特別な資格は不要ですが、農業機械の免許があると便利です。各種研修制度も充実しています。"
  },
  "和菓子職人": {
    "和菓子職人の魅力は？": "日本の四季や文化を表現できることです。お客様に季節の美しさと伝統の味を届けられます。",
    "和菓子職人になるには？": "和菓子店で修行するか、製菓学校で基礎を学んでから就職する道があります。",
    "和菓子業界の将来性は？": "海外でも日本文化への関心が高まり、和菓子の需要も拡大しています。伝統技術の価値が見直されています。",
    "和菓子職人の収入は？": "経験により幅がありますが、技術を身につければ安定した収入を得られます。独立開業も可能です。",
    "未経験でも和菓子職人になれる？": "はい！多くの和菓子店が後継者を求めており、丁寧に指導してくれます。",
    "和菓子作りは難しい？": "基本から丁寧に学べば必ず身につきます。季節感や美意識を大切にする心が重要です。",
    "和菓子職人の労働環境は？": "朝は早いですが、夕方には仕事が終わることが多く、プライベートの時間も確保できます。",
    "和菓子の技術継承は？": "一子相伝の技術も多く、直接指導を受けられる貴重な機会です。伝統を次世代に繋げる使命感があります。"
  }
};

// 成功事例データ
const successStories = [
  {
    name: "田中 健太さん（28歳）",
    profession: "大工",
    story: "IT企業から転職。「手に職をつけたい」と大工の道へ。3年で基本技術を習得し、今では若手のリーダーとして活躍中。",
    income: "年収450万円",
    satisfaction: "★★★★★"
  },
  {
    name: "佐藤 美咲さん（25歳）",
    profession: "農業",
    story: "大学卒業後、実家の農業を継承。有機野菜の直売で売上を倍増。SNSでの情報発信も積極的に行っている。",
    income: "年収380万円",
    satisfaction: "★★★★☆"
  },
  {
    name: "山田 雄一さん（32歳）",
    profession: "和菓子職人",
    story: "銀行員から和菓子職人に転身。伝統技術を学びながら、現代風のアレンジも加えて若い世代にも人気。",
    income: "年収420万円",
    satisfaction: "★★★★★"
  }
];

// 支援制度情報
const supportPrograms = [
  {
    title: "新規就農支援制度",
    description: "最大150万円/年の給付金（最長5年間）",
    target: "農業",
    contact: "農林水産省・各自治体"
  },
  {
    title: "ものづくり人材育成支援",
    description: "職業訓練費用の補助・就職支援",
    target: "大工・職人",
    contact: "厚生労働省・ハローワーク"
  },
  {
    title: "伝統工芸後継者育成事業",
    description: "研修費用補助・技術指導支援",
    target: "和菓子職人・伝統工芸",
    contact: "経済産業省・各都道府県"
  }
];

// 全質問をリスト化
const allQuestions: Array<{profession: string, question: string, answer: string}> = [];
Object.entries(knowledgeBase).forEach(([profession, qa]) => {
  Object.entries(qa).forEach(([question, answer]) => {
    allQuestions.push({profession, question, answer});
  });
});

// 類似度計算関数
function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  
  if (longer.length === 0) return 1.0;
  
  const editDistance = levenshteinDistance(longer, shorter);
  return (longer.length - editDistance) / longer.length;
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = [];
  
  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i];
  }
  
  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j;
  }
  
  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  
  return matrix[str2.length][str1.length];
}

interface Message {
  type: 'user' | 'bot';
  content: string;
  profession?: string;
}

function App() {
  const [activeTab, setActiveTab] = useState<'chat' | 'success' | 'support'>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const findBestAnswer = (userQuestion: string) => {
    if (!userQuestion.trim()) return null;
    
    let bestMatch = { similarity: 0, result: null as any };
    
    allQuestions.forEach(item => {
      const similarity = calculateSimilarity(userQuestion.toLowerCase(), item.question.toLowerCase());
      if (similarity > bestMatch.similarity) {
        bestMatch = { similarity, result: item };
      }
    });
    
    if (bestMatch.similarity > 0.3 && bestMatch.result) {
      return {
        answer: bestMatch.result.answer,
        profession: bestMatch.result.profession,
        matchedQuestion: bestMatch.result.question
      };
    }
    
    return null;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: inputText
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const result = findBestAnswer(inputText);
      
      let botMessage: Message;
      if (result) {
        botMessage = {
          type: 'bot',
          content: `【${result.profession}について】\n\n${result.answer}\n\n💡 もっと詳しく知りたい場合は、「成功事例」や「支援制度」タブもご覧ください！`,
          profession: result.profession
        };
      } else {
        botMessage = {
          type: 'bot',
          content: '申し訳ございませんが、その質問にはまだお答えできません。\n\n「大工の魅力は？」「農業を始めるには？」「和菓子職人になるには？」などの質問をお試しください。'
        };
      }
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleExampleClick = (question: string) => {
    setInputText(question);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* ヘッダー */}
      <div className="bg-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Heart className="w-12 h-12 text-red-500" />
              <h1 className="text-4xl font-bold text-gray-900">
                街を元気に！後継者応援アプリ
              </h1>
              <TrendingUp className="w-12 h-12 text-green-500" />
            </div>
            <p className="text-xl text-gray-600 mb-2">
              伝統技術を次世代へ繋ぎ、活気ある街を取り戻そう
            </p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>後継者育成支援</span>
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-1" />
                <span>地域活性化</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>技術継承</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* タブナビゲーション */}
        <div className="bg-white rounded-2xl shadow-xl mb-6">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'chat'
                  ? 'bg-blue-500 text-white rounded-tl-2xl'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <MessageCircle className="w-5 h-5 inline mr-2" />
              質問・相談
            </button>
            <button
              onClick={() => setActiveTab('success')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'success'
                  ? 'bg-green-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Star className="w-5 h-5 inline mr-2" />
              成功事例
            </button>
            <button
              onClick={() => setActiveTab('support')}
              className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                activeTab === 'support'
                  ? 'bg-purple-500 text-white rounded-tr-2xl'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <GraduationCap className="w-5 h-5 inline mr-2" />
              支援制度
            </button>
          </div>

          {/* チャットタブ */}
          {activeTab === 'chat' && (
            <div className="p-6">
              {/* チャットエリア */}
              <div className="bg-gray-50 rounded-xl mb-6 h-96 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.length === 0 && (
                      <div className="text-center text-gray-500 mt-20">
                        <Bot className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                        <p className="text-xl font-medium">後継者不足について何でも聞いてください！</p>
                        <p className="text-sm mt-2">大工・農業・和菓子職人の魅力や始め方をお答えします</p>
                      </div>
                    )}
                    
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex items-start space-x-3 max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            message.type === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-green-500 text-white'
                          }`}>
                            {message.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                          </div>
                          <div className={`px-4 py-3 rounded-2xl ${
                            message.type === 'user'
                              ? 'bg-blue-500 text-white'
                              : 'bg-white text-gray-800 shadow-md'
                          }`}>
                            <p className="text-sm whitespace-pre-line">{message.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                            <Bot className="w-5 h-5 text-white" />
                          </div>
                          <div className="bg-white px-4 py-3 rounded-2xl shadow-md">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 入力エリア */}
              <div className="flex space-x-4 mb-6">
                <textarea
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="後継者不足について何でも質問してください（例：大工の魅力は？農業を始めるには？）"
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  rows={3}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl text-white font-medium transition-colors flex items-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>送信</span>
                </button>
              </div>

              {/* よくある質問 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  "大工の魅力は何ですか？",
                  "農業を始めるには？",
                  "和菓子職人になるには？",
                  "未経験でも大工になれる？",
                  "農業は儲かる？",
                  "和菓子業界の将来性は？"
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleExampleClick(question)}
                    className="text-left p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-gray-700 transition-all duration-200 border border-blue-200 hover:border-blue-300"
                  >
                    <HelpCircle className="w-4 h-4 inline mr-2 text-blue-500" />
                    <span className="text-sm">{question}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 成功事例タブ */}
          {activeTab === 'success' && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🌟 後継者として成功した方々の事例
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 shadow-lg">
                    <div className="text-center mb-4">
                      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800">{story.name}</h4>
                      <p className="text-green-600 font-medium">{story.profession}</p>
                    </div>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{story.story}</p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">収入:</span>
                        <span className="font-medium text-green-600">{story.income}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">満足度:</span>
                        <span className="text-yellow-500">{story.satisfaction}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 text-center">
                <p className="text-lg text-gray-700 mb-4">
                  あなたも後継者として新しいキャリアを始めませんか？
                </p>
                <button
                  onClick={() => setActiveTab('support')}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-xl font-medium transition-colors"
                >
                  支援制度を見る
                </button>
              </div>
            </div>
          )}

          {/* 支援制度タブ */}
          {activeTab === 'support' && (
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                🎯 後継者支援制度・補助金情報
              </h3>
              <div className="space-y-6">
                {supportPrograms.map((program, index) => (
                  <div key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{program.title}</h4>
                        <p className="text-gray-700 mb-3">{program.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-1 text-purple-500" />
                            <span className="text-purple-600 font-medium">対象: {program.target}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="w-4 h-4 mr-1 text-gray-500" />
                            <span className="text-gray-600">問い合わせ: {program.contact}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-800 mb-4 text-center">
                  📞 相談窓口
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="text-center">
                    <Phone className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-medium">電話相談</p>
                    <p className="text-sm text-gray-600">平日 9:00-17:00</p>
                    <p className="text-blue-600 font-medium">0120-XXX-XXX</p>
                  </div>
                  <div className="text-center">
                    <Mail className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="font-medium">メール相談</p>
                    <p className="text-sm text-gray-600">24時間受付</p>
                    <p className="text-blue-600 font-medium">support@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 街の活性化メッセージ */}
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">🏘️ みんなで街を元気にしよう！</h2>
          <p className="text-xl mb-6">
            一人ひとりの挑戦が、街の未来を変える力になります
          </p>
          <div className="flex items-center justify-center space-x-8 text-lg">
            <div className="flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              <span>伝統技術の継承</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span>地域コミュニティ</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              <span>経済活性化</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;