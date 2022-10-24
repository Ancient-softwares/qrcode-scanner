<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller
{
    public function loginPage() {
        return view('login');
    }

    public function dashboardPage() {
        $login = Session::get('login');
        if(!$login) {
            return redirect('/');
        }
        return view('dashboard');
    }

    public function autenticar(Request $request) {
        $login = $request->login;
        $senha = $request->senha;
        
        if($login == 'admin' && $senha == "123") {
            Session::put('login', $login);
            return redirect()->route('dashboardPage');
        }


        return redirect()->back()->withErrors("Login ou senha incorretos!");
    }

    public function index() {
        $login = Session::get('login');
        if(!$login) {
            return redirect('/');
        }
        return view('index');

    }

    public function cadastrar(Request $request) {


        return redirect()->back();
    }

    public function logout() {
        Session::flush();
        return redirect('/');
    }

    public function registroPage() {
        return view('registro');
    }
}
