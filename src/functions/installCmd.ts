import { IForgeFunction } from "@tryforge/forgescript"

const Function: IForgeFunction = {
  name: "installCmd",
  params: ["package", "target"],
  code: `
  $let[pkg;$default[$env[package];ForgeScript]]
  
  $let[status;$httpRequest[$api[packages;packageName=$get[pkg]];GET]]
  $onlyIf[$get[status]==200;$ephemeral Error Fetching Package!]
  $jsonLoad[data;$httpResult[data]]
  
  $onlyIf[$env[data;id]!=;$ephemeral Invalid Package Provided!]
  $arrayLoad[branches;,;$env[data;mainBranch],$env[data;branches]]
  $let[repo;$env[data;githubPackageOwner]/$env[data;githubPackageName]]
  
  $if[$env[target]!=;$addTextDisplay[<@$env[target]>]]
  $addContainer[
    $addTextDisplay[# $env[data;packageName] Installation]
    $addSeparator[Large]
    $if[$env[data;npmPackageName]!=;
      $let[npm;$if[$env[data;npmPackageOwner]!=;@$env[data;npmPackageOwner]/]$env[data;npmPackageName]]
      $addTextDisplay[### Installing From NPM]
      $addTextDisplay[$codeBlock[npm i $get[npm];bash]]
      $addSeparator[Large]
    ]
    $addTextDisplay[### Installing From GitHub]
    $loop[$arrayLength[branches];
      $let[branch;$trim[$env[branches;$sub[$env[i];1]]]]
      $if[$get[branch]==;$continue]
      $addTextDisplay[**$get[branch] Branch**]
      $addTextDisplay[$codeBlock[npm i github:$get[repo]$if[$env[i]>1;#$get[branch]];bash]]
    ;i;true]
    $addSeparator[Large]
    $addTextDisplay[-# Made with love by BotForge Team <3]
    $addSeparator[Large]
    $addActionRow
    $addButton[https://docs.botforge.org/?p=$env[data;packageName];Docs;Link]
    $addButton[https://github.com/$get[repo];GitHub;Link]
    $if[$get[npm]!=;
      $addButton[https://npmjs.org/$get[npm];NPM;Link]
    ]
  ;$getGlobalVar[main]]
  `
}

export default Function