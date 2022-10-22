import React from 'react'
import {
	ActivityIndicator,
	FlatList,
	Modal,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from '../styles'

export default function RestrictedPage({ navigation }: any) {
	const [data, setData] = React.useState<any[]>([])
	const [filtered, setFiltered] = React.useState<any[]>([])
	const [search, setSearch] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(true)
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = data.filter((item) => {
				// Applying filter for the inserted text in search bar
				const itemData = item.data
					? item.data.toUpperCase()
					: ''.toUpperCase()

				const textData = text.toUpperCase()

				return itemData.indexOf(textData) > -1
			})
			setFiltered(newData)
			setSearch(text)
		} else {
			// Inserted text is blank
			// Update FilteredDataSource with masterDataSource
			setFiltered(data)
			setSearch(text)
		}
	}

	const getAllScans = async () => {
		await fetch('https://2c61-168-232-160-61.sa.ngrok.io/api/scans', {
			method: 'GET',
			mode: 'no-cors',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		})
			.then((response: Response): Promise<JSON> => response.json())
			.then((json: any): void => {
				console.log(json.scans)

				json.scans.forEach((scan: Array<Object>) => {
					data.push(scan)

					console.log(scan)
				})

				console.table(data)
			})
			.catch((error: Error): void => console.error(error))
			.finally((): void => setLoading(false))
	}

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return (
			<View style={{ width: '100%' }}>
				<TouchableOpacity
					style={[
						styles.item,
						{
							width: '100%',
							alignItems: 'flex-start',
						},
					]}
					onPress={() => {
						setModalVisible(true)
					}}
				>
					<Text style={[styles.title, { fontWeight: 'bold' }]}>
						ID:
					</Text>
					<Text style={[styles.headerText, { textAlign: 'left' }]}>
						{item.id}
					</Text>
					<Text style={[styles.title, { fontWeight: 'bold' }]}>
						Valor:
					</Text>
					<Text style={[styles.headerText, { textAlign: 'left' }]}>
						{item.data}
					</Text>
				</TouchableOpacity>

				<Modal
					animationType='slide'
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						setModalVisible(!modalVisible)
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text
								style={[styles.listTitle, { marginBottom: 10 }]}
							>
								Informações sobre o QR Code
							</Text>

							<View
								style={{
									alignItems: 'flex-start',
								}}
							>
								<Text style={styles.lilText}>
									ID: {item.id}
								</Text>
								<Text style={styles.lilText}>
									Valor: {item.data}
								</Text>
								<Text style={styles.lilText}>
									Criado: {item.created_at.split('T')[0]}
								</Text>
								<Text style={styles.lilText}>
									Atualizado: {item.updated_at.split('T')[0]}
								</Text>
							</View>
							<View style={[styles.row, { marginBottom: 15 }]}>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 },
									]}
									onPress={() =>
										setModalVisible(!modalVisible)
									}
								>
									<Text style={[styles.modalText]}>
										Fechar
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 },
									]}
									onPress={async () => {
										await fetch(
											`https://2c61-168-232-160-61.sa.ngrok.io/api/scan/${item.id}`,
											{
												method: 'DELETE',
												headers: {
													Accept: 'application/json',
													'Content-Type':
														'application/json',
												},
											}
										)
											.then(
												(
													response: Response
												): Promise<JSON> =>
													response.json()
											)
											.then((json: JSON): void =>
												window.alert(
													'QRCode deletada com successo!'
												)
											)
											.catch((error: Error): void =>
												console.error(error)
											)
									}}
								>
									<Text style={[styles.modalText]}>
										Deletar
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</Modal>
			</View>
		)
	}

	React.useEffect(() => {
		getAllScans()
	}, [])

	return (
		<View style={[styles.container, { backgroundColor: '#fff' }]}>
			{loading ? (
				<ActivityIndicator />
			) : (
				<View style={styles.container}>
					<SearchBar
						placeholder='Pesquisar QRCodes...'
						lightTheme
						platform='android'
						round
						value={search}
						onChangeText={(text: string) =>
							searchFilterFunction(text)
						}
						autoCorrect={false}
						blurOnSubmit={true}
						autoFocus={true}
						style={{
							width: '72%',
						}}
					/>

					<View style={[styles.row, { marginBottom: 15 }]}>
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => navigation.navigate('Home')}
						>
							<Text style={[styles.listTitle]}> Home </Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[styles.button]}
							onPress={() => navigation.navigate('Scan')}
						>
							<Text style={[styles.listTitle]}> Scan </Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={filtered}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						scrollEnabled={true}
						bounces={true}
					/>
				</View>
			)}
		</View>
	)
}
