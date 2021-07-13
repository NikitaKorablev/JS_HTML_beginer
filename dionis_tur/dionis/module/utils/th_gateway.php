<html><head><meta http-equiv=Content-Type content="text/html;charset=utf-8"></head><body>
<?
$x=$_GET['i'];

$uagent="Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; WOW64; Trident/4.0; SLCC2; .NET CLR 2.0.50727; InfoPath.2)";
$process = curl_init($x); 
curl_setopt($process, CURLOPT_USERAGENT, $uagent); 
curl_setopt($process, CURLOPT_TIMEOUT, 30); 
curl_setopt($process, CURLOPT_RETURNTRANSFER, 1); 
curl_setopt($process, CURLOPT_FOLLOWLOCATION, 1); 
$res = curl_exec($process); 
curl_close($process);

$A=array('="/');
$B=array('="http://www.tophotels.ru/');
$res=str_replace($A,$B,$res);
echo $res;
?>
</body></html>