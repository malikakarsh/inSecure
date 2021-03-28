<!DOCKTYPE html>
<html>
    <head>
        <title>Login</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <style>
        *{margin: 0;padding: 0;}

        body{
            background-color: 000000;
            color: #008000;
            
        }

        .div1 {
            text-align: center;
        }

        .div2 {
            text-align: center;
        }

        .div3 {
            margin-top: 10%;
            width: 100%;
        }

        .space{
            padding: 10px 10px 10px 10px;
            margin: 10px 10px 10px 10px;

        }


        </style>
    </head>
    <body>
        <div class="div3">
            <div class="div2">
            <h1 class="space" style="display: inline;">OS command injection  Test</h1>
            <form action="" method="GET">
                <select name="connect_to" class="space">
                    <option value="test1">test1</option>
                    <option value="test2">test2</option>
                    <option value="test3">test3</option>
                </select>
                <button class="space" style="padding: 10px 20px 10px 20px;" type="submit" name="submit">CHECK</button>
            </form>
            <?php
            if (isset($_GET['submit'])){
            $command=$_GET['connect_to']; 
            if ($_GET['connect_to']=='test1'){
                echo "<h3 style='color: red;padding-top: 10px;'>Down!</h3>";
            }
            else if ($_GET['connect_to']=='test2'){
                echo "<h3 style='color: red;padding-top: 10px;'>Down!</h3>";
            }
            else{
            $cmd="ping -c 2 $command";
            echo "<h3 style='padding-top: 10px;'>Up!</h3>";
            $output=shell_exec($cmd); 
            echo "<pre>$output</pre>"; 
            }
            }
            ?>
			</div>
		</div>
    </body>
</html>

