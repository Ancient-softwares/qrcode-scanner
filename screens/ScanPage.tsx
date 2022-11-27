import { BarCodeScanner } from 'expo-barcode-scanner'
import React, { useEffect, useState } from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styles from '../styles'

const App = ({ navigation }: any): JSX.Element => {
	const [hasPermission, setHasPermission] = useState<any>(null)
	const [scanned, setScanned] = useState<boolean>(false)
	const [data, setData] = useState<string>('')
	const [type, setType] = useState<number>(0)
	const [message, setMessage] = useState<string>('')

	useEffect((): void => {
		const getBarCodeScannerPermissions = async () => {
			const { status } = await BarCodeScanner.requestPermissionsAsync()
			setHasPermission(status === 'granted')
		}

		getBarCodeScannerPermissions()
	}, [])

	const sendMysql = async ({ data }: { data: string }): Promise<void> => {
		const url = `https://qr-code-etec.herokuapp.com/api/scan`

		await fetch(url, {
			method: 'post',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				data
			})
		})
			.then((response: Response): Promise<JSON> => response.json())
			.then((response: any): void => {
				setMessage(response.message)
				console.log(response)
			})
			.catch((error) => {
				window.alert(
					`Server error: ${error}\nData scanner: ${data} - ${type}`
				)

				console.error(error)
			})
			.finally(() => {
				afterScan({
					type: 0,
					data: ''
				})
			})
	}

	const afterScan = async ({
		type,
		data
	}: {
		type: number
		data: string
	}): Promise<void> => {
		setScanned(true)
		setData(data)
		setType(type)
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

		sendMysql({ data: data })
	}

	if (hasPermission === null) {
		return <Text>Requesting for camera permission</Text>
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}

	return (
		<View style={styles.container}>
			<BarCodeScanner
				onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
				style={StyleSheet.absoluteFillObject}
			/>
			{scanned && (
				<Modal
					animationType='slide'
					transparent={true}
					visible={scanned}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text
								style={[styles.listTitle, { marginBottom: 15 }]}
							>
								QRCode escaneado com sucesso!
							</Text>
							<Text
								style={[
									styles.lilText,
									{
										fontStyle: 'italic',
										fontSize: 18,
										marginBottom: 15
									}
								]}
							>
								{message}
							</Text>
							<View style={{ flexDirection: 'row' }}>
								<TouchableOpacity
									style={styles.button}
									onPress={() => setScanned(false)}
								>
									<Text
										style={[
											styles.modalText,
											{ fontWeight: 'bold' }
										]}
									>
										Escanear Novamente
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.button}
									onPress={() => navigation.navigate('Home')}
								>
									<Text
										style={[
											styles.modalText,
											{ fontWeight: 'bold' }
										]}
									>
										Tela inicial
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			)}
		</View>
	)
}

export default App
