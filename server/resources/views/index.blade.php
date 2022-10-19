@extends('layouts.hamburguer')

@section('titulo', 'Index')
<header>
    <link href="{{ asset('css/editsRotasCrud/index.css') }}" rel="stylesheet" type="text/css">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>QRCode admin</title>

</header>

@section('conteudo')


<div class="container mt-4">

    <div class="card">
        <div class="card-header">
            <h2>Simple QR Code</h2>
        </div>
        <div class="card-body">
        </div>
    </div>

    <div class="card">
        <div class="card-header">
            <h2>Color QR Code</h2>
        </div>
        <div class="card-body">
        </div>
    </div>

</div>
</div>
@endsection