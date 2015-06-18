# jQuery Auto complete Plug-in #
<p align='left'>A <b>highly customizable</b> jQuery plug-in for  auto complete feature for your smart search requirements in web applications. This plug-in is developed in jQuery-1.6.3 and is working in all the modern browsers. You can search any data if you want on client side.<br>
There is no need of server side interaction. Means, you can download data that you want to search on client side. This plug-in can fairly handle very large amount of data,say up to 10000.<br>
</p>
<p>
The search is case insensitive. The search results will be automatically included a vertical scroll bar if the result data is returned more. So you can view effectively large data. Besides, there are several options you can set while using this plug-ins and accordingly the plug-in will display the results. For example, you can set row height of display grid as per your project requirement.</p>

A typical usage of this plug-in is as follows:
```
<input type="text" name="txt"  id ="city" size = "30">
<script>
var data = new Array("Aberdeen", "Ada", "Adamsville", "Addyston", "Adelphi", "Adena", "Adrian", "Akron");

  var option = {bgColor:'blue', rowHeight:25, searchHighlight:false, fontType:'Calibri', fontStyle:'Bold'};
      $('#city').autosearch(data,option);
</script>
```

