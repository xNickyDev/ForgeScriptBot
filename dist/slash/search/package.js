"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.ApplicationCommand({
    data: {
        type: discord_js_1.ApplicationCommandType.ChatInput,
        name: "package",
        description: "Search for a specific package",
        options: [
            {
                type: discord_js_1.ApplicationCommandOptionType.String,
                name: "name",
                description: "The package you want to search",
                required: true,
                autocomplete: true,
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.User,
                name: "target",
                description: "The person you want to ping",
            },
            {
                type: discord_js_1.ApplicationCommandOptionType.Boolean,
                name: "hidden",
                description: "If the reply should be hidden or not",
            },
        ],
    },
    code: `
  $let[name;$option[name]]
  
  $jsonLoad[data;$fetchPackage[$get[name]]]
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  $let[npm;$if[$env[data;npmPackageOwner]!=;@$env[data;npmPackageOwner]/]$env[data;npmPackageName]]
  
  $if[$option[hidden];$ephemeral]
  $defer
  
  $let[width;2048]
  $let[height;1024]
  $createCanvas[pkg;$get[width];$get[height];
    $newLinearGradient[bg;0;$get[height];$get[width];0;
      $addColorStop[;0;#180024]
      $addColorStop[;1;#110033]
    ]
    $drawRect[;fill;gradient://bg;0;0;$get[width];$get[height]]
    
    $let[font;120px Gilroy-ExtraBold]
    $textAlign[;center]
    $drawText[;fill;$env[data;packageName];$get[font];#ffffff;$math[$get[width]/2];150;$get[width]]
    
    $if[$env[data;official];
      $jsonLoad[msr;$measureText[;$env[data;packageName];$get[font]]]
      $let[x;$math[(($get[width]+$env[msr;width])/2)+25]]
      $let[y;$math[(($env[msr;emHeightAscent]+$env[msr;emHeightDescent])/2)+15]]
      $drawImage[;https://raw.githubusercontent.com/xNickyDev/ForgeScriptBot/refs/heads/main/assets/verified.png;$get[x];$get[y];75;75]
    ]
    
    $fn[pushLine;
      $jsonLoad[obj;{}]
      $!jsonSet[obj;i;$get[i]]
      $!jsonSet[obj;text;[\\]]
      $!jsonSet[obj;text;0;$env[word]]
      $arrayPushJSON[lines;$env[obj]]
    ]
    
    $let[font;40px microsoft-yahei]
    $arrayLoad[words; ;$env[data;packageDescription]]
    $arrayLoad[lines]
    $let[i;0]
    $arrayForEach[words;word;
      $let[index;$arrayFindIndex[lines;v;$env[v;i]==$get[i]]]
      $jsonLoad[line;$env[lines;$get[index]]]
      $if[$env[line]==;
        $callFn[pushLine]
      ;
        $jsonLoad[text;$env[line;text]]
        $arrayPush[text;$env[word]]
        $let[lineWidth;$measureText[;$arrayJoin[text; ];$get[font];width]]
        $if[$get[lineWidth]>$math[$get[width]-200];
          $letSum[i;1]
          $callFn[pushLine]
        ;
          $!jsonSet[line;text;$env[text]]
          $!jsonSet[lines;$get[index];$env[line]]
        ]
      ]
    ]
    
    $let[start;$math[275+(($get[height]/2-275)-($arrayLength[lines]*75))/2]]
    $arrayForEach[lines;line;
      $jsonLoad[text;$env[line;text]]
      $drawText[;fill;$arrayJoin[text; ];$get[font];#ffffff;$math[$get[width]/2];$math[$get[start]+(75*$env[line;i])]]
    ]
    
    $let[install;npm i $if[$env[data;npmPackageName]!=;$get[npm];github:$get[repo]]]
    $jsonLoad[installMsr;$measureText[;$get[install];bold $get[font]]]
    
    $let[butX;$math[($get[width]-$env[installMsr;width]-100)/2]]
    $let[butY;$math[$get[height]/2]]
    $let[butW;$math[$env[installMsr;width]+100]]
    $let[butH;$math[$env[installMsr;emHeightAscent]+$env[installMsr;emHeightDescent]+20]]
    
    $beginPath
    $newLinearGradient[install;$get[butX];$get[butY];$math[$get[butW]+$get[butX]];$math[$get[butH]+$get[butY]];
      $addColorStop[;0;#4831b3]
      $addColorStop[;1;#2b327d]
    ]
    $drawRect[;none;;$get[butX];$get[butY];$get[butW];$get[butH];50]
    $fill[;gradient://install]
    $closePath
    
    $drawText[;fill;$get[install];bold $get[font];#ffffff;$math[$get[width]/2];$math[$get[butY]+50]]
    
    $if[$or[$env[data;leadDev]==;$env[data;authorName]==$env[data;leadDev]];
      $let[w;1000]
      $let[h;300]
      $let[x;$math[($get[width]-$get[w])/2]]
      $let[y;$math[$get[height]-($get[h]+50)]]
      
      $beginPath
      $newLinearGradient[author;$get[x];$get[y];$math[$get[w]+$get[width]/2+100];$math[$get[y]+$get[h]];
        $addColorStop[;0;#552dd0]
        $addColorStop[;1;#240e6e]
      ]
      $drawRect[;none;;$get[x];$get[y];$get[w];$get[h];40]
      $fill[;gradient://author]
      $closePath
      
      $drawImage[;$env[data;authorAvatar];$math[$get[x]+100];$math[$get[y]+($get[h]-150)/2];$math[$get[h]-150];$math[$get[h]-150];$math[$get[width]/2]]
      
      $let[font;50px Gilroy-ExtraBold]
      $textAlign[;left]
      $drawText[;fill;$env[data;authorName];$get[font];#ffffff;$math[$get[x]+$get[h]];$math[$get[y]+($get[h]-40)/2];$math[$get[w]-$get[h]]]
      $let[font;30px Gilroy-ExtraBold]
      $drawText[;fill;Author $if[$env[data;leadDev]!=;& Lead Developer ]of $env[data;packageName];$get[font];#eabfff;$math[$get[x]+$get[h]];$math[$get[y]+($get[h]+85)/2];$math[$get[w]-$get[h]]]
    ;
      $let[w;700]
      $let[h;300]
      $let[y;$math[$get[height]-($get[h]+50)]]
      
      $beginPath
      $newLinearGradient[author;$math[$get[width]/2+100];$get[y];$math[$get[w]+$get[width]/2+100];$math[$get[y]+$get[h]];
        $addColorStop[;0;#552dd0]
        $addColorStop[;1;#240e6e]
      ]
      $drawRect[;none;;$math[$get[width]/2+100];$get[y];$get[w];$get[h];40]
      $fill[;gradient://author]
      $closePath
      
      $beginPath
      $newLinearGradient[lead;$math[$get[width]/2-($get[w]+100)];$get[y];$math[$get[w]+$get[width]/2-($get[w]+100)];$math[$get[y]+$get[h]];
        $addColorStop[;0;#552dd0]
        $addColorStop[;1;#240e6e]
      ]
      $drawRect[;none;;$math[$get[width]/2-($get[w]+100)];$get[y];$get[w];$get[h];40]
      $fill[;gradient://lead]
      $closePath
      
      $drawImage[;$env[data;authorAvatar];$math[$get[width]/2-($get[w]+25)];$math[$get[y]+($get[h]-150)/2];$math[$get[h]-150];$math[$get[h]-150];$math[$get[width]/2]]
      $drawImage[;$env[data;leadDevAvatar];$math[$get[width]/2+175];$math[$get[y]+($get[h]-150)/2];$math[$get[h]-150];$math[$get[h]-150];$math[$get[width]/2]]
      
      $let[font;50px Gilroy-ExtraBold]
      $textAlign[;left]
      $drawText[;fill;$env[data;authorName];$get[font];#ffffff;$math[$get[width]/2-$get[w]+$get[h]-150];$math[$get[y]+($get[h]-40)/2];$math[$get[w]-$get[h]]]
      $drawText[;fill;$env[data;leadDev];$get[font];#ffffff;$math[$get[width]/2+$get[h]+50];$math[$get[y]+($get[h]-40)/2];$math[$get[w]-$get[h]]]
      $let[font;30px Gilroy-ExtraBold]
      $drawText[;fill;Author of $env[data;packageName];$get[font];#eabfff;$math[$get[width]/2-$get[w]+$get[h]-150];$math[$get[y]+($get[h]+85)/2];$math[$get[w]-$get[h]]]
      $drawText[;fill;Lead Developer of $env[data;packageName];$get[font];#eabfff;$math[$get[width]/2+$get[h]+50];$math[$get[y]+($get[h]+85)/2];$math[$get[w]-$get[h]]]
    ]
  ]
  $attachCanvas[pkg;$env[data;packageName].png]
  
  $if[$option[target]!=;$addTextDisplay[<@$option[target]>]]
  $addContainer[
    $addTextDisplay[# $env[data;packageName]]
    $addSeparator
    $addTextDisplay[$env[data;packageDescription]]
    $addMediaGallery[
      $addMediaItem[attachment://$env[data;packageName].png]
    ]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/?p=$env[data;packageName];Docs;Link]
    $addButton[https://github.com/$get[repo];GitHub;Link]
    $if[$env[data;npmPackageName]!=;
      $addButton[https://npmjs.org/$get[npm];NPM;Link]
    ]
  ;$getGlobalVar[main]]
  `
});
//# sourceMappingURL=package.js.map