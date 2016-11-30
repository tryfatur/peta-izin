<?php
	$data = file_get_contents('src/json/raw/koordinat_iup_2015_2016.json');
	$data = json_decode($data, true);
	$total = count($data['rows']);

	$x['type'] = 'FeatureCollection';
	for ($i=0; $i < $total; $i++)
	{
		if (!is_null($data['rows'][$i]['longitude']))
		{
			$x['features'][$i]['type'] = 'Feature';

			$x['features'][$i]['properties']['jenis_izin']      = $data['rows'][$i]['jenis_izin'];
			$x['features'][$i]['properties']['nama_perusahaan'] = strtoupper($data['rows'][$i]['nama_perusahaan']);
			$x['features'][$i]['properties']['nomor_izin']      = $data['rows'][$i]['nomor_izin'];
			$x['features'][$i]['properties']['tgl_akhir']       = $data['rows'][$i]['tgl_akhir'];

			$x['features'][$i]['geometry']['type'] = 'Point';
			$x['features'][$i]['geometry']['coordinates'][] = $data['rows'][$i]['longitude'];
			$x['features'][$i]['geometry']['coordinates'][] = $data['rows'][$i]['latitude'];
		}
	}

	/*echo "<pre>";
	print_r ($x);
	echo "</pre>";*/

	echo json_encode($x);
?>