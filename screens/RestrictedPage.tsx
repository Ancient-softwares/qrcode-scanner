import React from 'react'
import {
	ActivityIndicator,
	FlatList,
	Modal,
	RefreshControl,
	Text,
	TouchableOpacity,
	View
} from 'react-native'
import { SearchBar } from 'react-native-elements'

import styles from '../styles'

const RestrictedPage = ({ navigation }: any) => {
	const [data, setData] = React.useState<any[]>([])
	const scans: any[] = []
	const [refresh, setRefresh] = React.useState<boolean>(false)
	const [filtered, setFiltered] = React.useState<any[]>([])
	const [search, setSearch] = React.useState<string>('')
	const [loading, setLoading] = React.useState<boolean>(true)
	const [modalVisible, setModalVisible] = React.useState<boolean>(false)
	const [modalData, setModalData] = React.useState<any>({
		id_qrcode: '',
		codigo_qrcode: '',
		status_qrcode: '',
		created_at: ''
	})

	const searchFilterFunction = (text: string) => {
		// Check if searched text is not blank
		if (text) {
			// Inserted text is not blank
			// Filter the masterDataSource and update FilteredDataSource
			const newData = filtered.filter((item: any) => {
				console.log(item.nome_evento)
				// Applying filter for the inserted text in search bar
				const itemData = item.nome_evento
					? item.nome_evento.toUpperCase()
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
		try {
			await fetch('https://qr-code-etec.herokuapp.com/api/scans', {
				method: 'GET',
				mode: 'no-cors',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			})
				.then((response: Response): Promise<JSON> => response.json())
				.then((json: any): void => {
					// console.log(json.scans)
					json.scans.forEach((scan: Array<Object>) => {
						scans.push(scan)

						// console.log(scan)
					})

					setRefresh(false)
					setData(scans)
					setFiltered(scans)
					setLoading(false)
					// console.table(data)
				})
				.catch((error: Error): void => console.error(error))
		} catch (error) {
			console.error(error)
		}
	}

	const renderItem = ({ item }: { item: any }): JSX.Element => {
		return (
			<View style={{ width: '100%' }}>
				<TouchableOpacity
					style={[
						styles.item,
						{
							width: '100%',
							alignItems: 'flex-start'
						}
					]}
					onPress={() => {
						setModalData(item)
						console.log('modal data', modalData)
						setModalVisible(true)
					}}
				>
					<Text
						style={[
							styles.title,
							{ fontWeight: 'bold', fontSize: 16 }
						]}
					>
						ID:{' '}
						<Text
							style={[styles.headerText, { textAlign: 'left' }]}
						>
							{item.id_qrcode}
						</Text>
					</Text>
					<Text
						style={[
							styles.title,
							{ fontWeight: 'bold', fontSize: 16 }
						]}
					>
						Código:{' '}
						<Text
							style={[styles.headerText, { textAlign: 'left' }]}
						>
							{item.codigo_qrcode}
						</Text>
					</Text>
					<Text
						style={[
							styles.title,
							{ fontWeight: 'bold', fontSize: 16 }
						]}
					>
						Status:{' '}
						<Text
							style={[styles.headerText, { textAlign: 'left' }]}
						>
							{item.status_qrcode}
						</Text>
					</Text>
					<Text
						style={[
							styles.title,
							{ fontWeight: 'bold', fontSize: 16 }
						]}
					>
						Evento:{' '}
						<Text
							style={[styles.headerText, { textAlign: 'left' }]}
						>
							{item.nome_evento}
						</Text>
					</Text>
					<Text
						style={[
							styles.title,
							{ fontWeight: 'bold', fontSize: 16 }
						]}
					>
						Criado:{' '}
						<Text
							style={[styles.headerText, { textAlign: 'left' }]}
						>
							{item.created_at.substring(0, 10)} ({' '}
							{item.created_at.substring(11, 19)} )
						</Text>
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
									alignItems: 'flex-start'
								}}
							>
								<Text style={styles.lilText}>
									ID: {modalData.id_qrcode}
								</Text>
								<Text style={styles.lilText}>
									Valor: {modalData.codigo_qrcode}
								</Text>
								<Text style={styles.lilText}>
									Status: {modalData.status_qrcode}
								</Text>
								<Text style={styles.lilText}>
									Criado: {modalData.created_at.split('T')[0]}
								</Text>
							</View>
							<View style={[styles.row, { marginBottom: 15 }]}>
								<TouchableOpacity
									style={[
										styles.button,
										{ padding: 4, marginHorizontal: 6 }
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
										{ padding: 4, marginHorizontal: 6 }
									]}
									onPress={async () => {
										await fetch(
											`https://qr-code-etec.herokuapp.com/api/scan/${item.id_qrcode}`,
											{
												method: 'DELETE',
												headers: {
													Accept: 'application/json',
													'Content-Type':
														'application/json'
												}
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
		navigation.addListener('focus', () => {
			getAllScans()
		})
	}, [navigation, filtered])

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
						onChangeText={(text: string): void => {
							if (text.length === 0) {
								console.log(data)
								setFiltered(data)
							}

							searchFilterFunction(text)
						}}
						autoCorrect={false}
						blurOnSubmit={true}
						autoFocus={true}
						style={{
							width: '72%'
						}}
					/>

					<View style={[styles.row, { marginBottom: 15 }]}>
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
							onPress={() => navigation.navigate('Scan')}
						>
							<Text style={[styles.listTitle]}> Scanner </Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.button,
								{ marginHorizontal: 5, paddingHorizontal: 7.5 }
							]}
							onPress={async (): Promise<void> => {
								await fetch(
									'https://qr-code-etec.herokuapp.com/api/scans',
									{
										method: 'DELETE',
										headers: {
											Accept: 'application/json',
											'Content-Type': 'application/json'
										}
									}
								)
									.then(
										(response: Response): Promise<JSON> =>
											response.json()
									)
									.then((json: JSON): void => {
										window.alert(
											'QRCodes deletadas com sucesso!'
										)

										getAllScans()
									})
									.catch((error: Error): void =>
										console.error(error)
									)
							}}
						>
							<Text style={[styles.listTitle]}> Limpar </Text>
						</TouchableOpacity>
					</View>

					<FlatList
						data={filtered}
						renderItem={renderItem}
						keyExtractor={(item: { id_qrcode: string }) =>
							item.id_qrcode
						}
						scrollEnabled={true}
						bounces={true}
						showsVerticalScrollIndicator={false}
						refreshControl={
							<RefreshControl
								refreshing={refresh}
								onRefresh={getAllScans}
								enabled={true}
							/>
						}
					/>
				</View>
			)}
		</View>
	)
}

export default RestrictedPage
