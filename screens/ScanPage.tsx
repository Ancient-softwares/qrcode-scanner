import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styles from '../styles'

const ScanPage = ({ navigation }: any): JSX.Element => {
	const [hasPermission, setHasPermission] = useState<any>(null)
	const [scanned, setScanned] = useState<boolean>(false)

	useEffect((): void => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getBarCodeScannerPermissions()
	}, [])

	const uploadScanToServer = async ({
		data
	}: {
		data: string
	}): Promise<void> => {
		const url = `https://qr-code-etec.herokuapp.com/api/scan`

		await fetch(url, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data })
		})
			.then((response: Response): Promise<JSON> => response.json())
			.then((response: any): void => {
				window.alert(`Operação: ${response.message}`)
				afterScan()

				console.log(response)
			})
			.catch((error) => {
				window.alert(`Server error: ${error}\nData scanner: ${data}`)

				console.error(error)
			})
			.finally(() => {
				if (scanned) {
					setScanned(false)
				}
				// afterScan()
			})
	}

	const afterScan = async (): Promise<void> => {
		setScanned(!scanned)
	}

	const handleBarCodeScanned = ({
		type,
		data
	}: {
		type: number
		data: string
	}): void => {
		setScanned(true)
		console.log(
			`Bar code with type ${type} and data ${data} has been scanned!`
		)

		uploadScanToServer({ data })
	}

	const handleAfterScan = (): JSX.Element => {
		return (
			<View style={[styles.container, { flexDirection: 'row' }]}>
				<TouchableOpacity
					style={[
						styles.button,
						{ marginHorizontal: 5, paddingHorizontal: 7.5 }
					]}
					onPress={() => navigation.navigate('Home')}
				>
					<Text style={[styles.listTitle]}> Home </Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.button,
						{ marginHorizontal: 5, paddingHorizontal: 7.5 }
					]}
					onPress={() => setScanned(true)}
				>
					<Text style={[styles.listTitle]}> Escanear </Text>
				</TouchableOpacity>
			</View>
		)
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<>
			{!scanned ? (
				handleAfterScan()
			) : (
				<View
					style={[
						styles.container,
						{
							width: '100%',
							height: '100%',
							backgroundColor: 'transparent'
						}
					]}
				>
					<BarCodeScanner
						onBarCodeScanned={
							!scanned ? undefined : handleBarCodeScanned
						}
						style={[
							StyleSheet.absoluteFillObject,
							styles.container,
							{
								zIndex: 1,
								width: '100%',
								height: '100%',
								backgroundColor: 'transparent'
							}
						]}
						children={
							/* Displays a transparent square in the center */
							<View
								style={{
									position: 'absolute',
									flex: 1,
									marginTop: '70%',
									marginLeft: '20%',
									width: '50%',
									height: '15%',
									backgroundColor: 'rgba(0,0,0,0.2)',
									borderColor: 'white',
									borderWidth: 2,
									borderRadius: 10,
									zIndex: 2
								}}
							></View>
						}
					/>
				</View>
			)}
		</>
	)
}

export default ScanPage
