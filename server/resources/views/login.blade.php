<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>

    <link href="{{ asset('css/login.css') }}" rel="stylesheet">

    <title>Login</title>
</head>
<body>
@if($errors->any())
<div class="alert alert-danger" role="alert">
    {{ $errors->first() }}
</div>
@endif

    <!-- partial:index.partial.html -->
<div id="login-form-wrap">
  <h2>Login</h2>
 
  <form id="login-form" method="POST" action="{{ route('autenticar') }}">
  @csrf
    <input type="text" id="username" name="login" placeholder="E-mail" required><i class="validation"><span></span><span></span></i>
    </p>
    <p>
    <input type="password" id="email" name="senha" placeholder="Senha" required><i class="validation"><span></span><span></span></i>
    </p>
    <p>
    <input type="submit" id="login" value="enviar">
    </p>
  </form>
  <div id="create-account-wrap">
  </div>
</div>

       
</body>
</html>