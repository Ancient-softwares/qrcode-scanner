<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>

    {{-- links --}}
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-iYQeCzEYFbKjA/T2uDLTpkwGzCiq6soy8tYaI1GyVh/UjpbCx/TYkiZhlZB6+fzT" crossorigin="anonymous">

    {{-- Scripts --}}
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js" integrity="sha384-oBqDVmMz9ATKxIep9tiCxS/Z9fNfEXiDAYTujMAeBAsjFuCZSmKbSSUnQlmh/jp3" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.1/dist/js/bootstrap.min.js" integrity="sha384-7VPbUDkoPSGFnVtYi0QogXtr74QeVeeIs99Qfg5YCF+TidwNdjvaKZX19NZ/e6oz" crossorigin="anonymous"></script>

    <link href="{{ asset('css/navbar.css') }}" rel="stylesheet">
   
    <link href="{{ asset('css/modal.css') }}" rel="stylesheet">

</head>
<body>

    
    <nav class="navbar navbar-expand-lg  navbar navbar-custom">
        <div class="container-fluid">
        <a class="navbar-brand" href="{{ route('dashboardPage') }}">
                <img src="{{ asset('img/p20.png') }}" alt="Bootstrap" width="35" height="35">
                Administrativo
            </a>
            
            
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                <a class="nav-link" href="{{ route('categoria.index') }}">qrcodes</a>
                </li>
                
            </ul>
            <ul class="navbar-nav ms-auto">
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('logout') }}">Sair <img src="{{ asset('img/logout.png') }}" width="20px"></a>
                </li>
            </ul>

            </div>
        </div>
    </div>
    </nav>

    @yield('conteudo')
</body>
</html>