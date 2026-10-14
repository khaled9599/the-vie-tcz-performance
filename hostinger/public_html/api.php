<?php
require dirname(__DIR__).'/private/bootstrap.php';
session_init();
try {
 $route=$_GET['route']??'';$write=$_SERVER['REQUEST_METHOD']==='POST';if($write){owner();origin_guard();if(strtok($_SERVER['CONTENT_TYPE']??'',';')!=='application/json')fail('JSON required.',403);$raw=file_get_contents('php://input',false,null,0,30001);if(strlen($raw)>30000)fail('Request too large.');$b=json_decode($raw,true,512,JSON_THROW_ON_ERROR);}
 if($route==='site-settings'){$scope='presentation';$default=defaults()['presentation'];if($write){change_state($scope,$default,$b,'presentation');reply(['ok'=>true]);}$s=state(all_states(),$scope,$default);if(($_GET['editor']??'')==='1'){owner();reply($s);}reply(['published'=>$s['published']]);}
 if(!in_array($route,['report','admin'],true))fail('Not found.',404);if($route==='admin')owner();if(($_GET['account']??ACCOUNT)!==ACCOUNT||($write&&($b['account']??'')!==ACCOUNT))fail('Account is not allowed.');$p=['start'=>$write?$b['start']:($_GET['start']??null),'end'=>$write?$b['end']:($_GET['end']??null)];range_check($p['start'],$p['end']);$scope=ACCOUNT.':'.$p['start'].':'.$p['end'];$source=snapshot();
 if($write){if(!is_string($b['reason']??null)||strlen(trim($b['reason']))<3||strlen($b['reason'])>2000)fail('A revision reason is required.');change_state($scope,empty_config(),$b,fn($c)=>report_config($c,$p,$source));reply(['ok'=>true]);}
 $s=state(all_states(),$scope,empty_config());if($route==='report')reply(['snapshot'=>$source,'config'=>$s['published']]);reply(['snapshot'=>$source,'state'=>$s,'history'=>array_map(fn($h)=>array_diff_key($h,['config'=>1]),array_slice($s['history'],0,100))]);
}catch(Throwable $e){fail($e instanceof RuntimeException?$e->getMessage():'The report could not be loaded.');}
