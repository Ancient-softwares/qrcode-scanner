<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ScanModel;
use Illuminate\Contracts\View\View;
use \Illuminate\Http\Response;

class ScansController extends Controller
{
    private $scans;

    public function _construct()
    {
        $this->scans = new ScanModel();
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): View
    {
        return view('scans.index', compact(['scans' => $this->scans->all()]));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request): Response
    {
        $query = $this->scans->create([
            'data' => $request->data,
        ]);

        if ($query) {
            return response()->success('Data saved successfully');
        } else {
            return response()->failed('Data failed to save');
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request): Response
    {
        try {

            $query = ScanModel::create([
                'data' => $request->data,
            ]);

            if ($query) {
                return response([
                    'status' => 200,
                    'message' => 'QRCode salvo com sucesso',
                    'data' => $request->all(),
                ]);
            } else {

                return response([
                    'status' => 500,
                    'message' => 'Erro ao salvar QRCode',
                    'data' => $request->all(),
                ]);
            }
        } catch (\Exception $e) {
            if ($e instanceof \Illuminate\Database\QueryException && $e->getCode() == 23000) {
                return response([
                    'status' => 500,
                    'message' => 'O QRCode já existe',
                    'data' => $e->getMessage(),
                ]);
            }
        }

        return response([
            'status' => 500,
            'message' => 'Erro ao salvar QRCode',
            'data' => $request->all(),
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(): Response
    {
        $scans = ScanModel::all();

        return response([
            'scans' => $scans,
            'message' => 'Dados retornados com sucesso',
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id): Response
    {
        return response([
            'message' => 'LOL'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id): Response
    {
        $actualData = ScanModel::find($id);


        if ($request->isMethod('patch')) {
            if ($request->data) {
                $query = ScanModel::where('id', $id)->update([
                    'data' => $request->data,
                ]);

                return response([
                    'status' => 200,
                    'message' => 'QRCode atualizado com sucesso',
                    'data' => $query . json_encode($request),
                ]);
            } else {
                return response([
                    'status' => 500,
                    'message' => 'QRCode não atualizado',
                    'data' => json_encode($request),
                ]);
            }
        } else if ($request->isMethod('put')) {
            $query = ScanModel::where('id', $id)->update([
                'data' => $request->data,
            ]);

            return response([
                'status' => 200,
                'message' => 'QRCode atualizado com sucesso',
                'data' => $query . json_encode($request),
            ]);
        } else {
            return response([
                'status' => 500,
                'message' => 'QRCode não atualizado',
                'data' => json_encode($request),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id): Response
    {
        // $query = $this->scan->where('id', $id)->delete();
        $query = ScanModel::where('id', $id)->delete();

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Data deleted successfully',
                'data' => $query,
            ]);
        } else {
            return response([
                'status' => 500,
                'message' => 'Data failed to delete',
                'data' => $query,
            ]);
        }
    }

    /**
     * Remove all resources from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroyAll(): Response
    {
        $query = ScanModel::truncate();

        if ($query) {
            return response([
                'status' => 200,
                'message' => 'Dados deletados com sucesso',
                'data' => $query,
            ]);
        } else {
            return response([
                'status' => 500,
                'message' => 'Erro ao deletar dados',
                'data' => $query,
            ]);
        }
    }
}
