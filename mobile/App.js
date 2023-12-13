import React, { useState, useEffect } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableOpacity, Alert, TextInput } from 'react-native';

/**
 * Componente principal de la aplicación.
 * @returns {React.ReactElement} Elemento React representando la aplicación.
 */
const App = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const baseURL = 'http://192.168.222.132:3000'; // Reemplaza 'IP' con la dirección IP de tu servidor

  useEffect(() => {
    fetchPosts();
  }, []);

  /**
   * Fetch y actualiza el estado de posts con los datos de la API.
   */
  const fetchPosts = () => {
    fetch(`${baseURL}/posts`)
      .then(response => response.json())
      .then(postsData => {
        Promise.all(
          postsData.map(post =>
            fetch(`${baseURL}/comments?postId=${post.id}`)
              .then(response => response.json())
              .then(comments => ({
                ...post,
                comments,
                image: `https://source.unsplash.com/random/200x200?sig=${Math.random()}`
              }))
          )
        ).then(postsWithComments => setPosts(postsWithComments));
      })
      .catch(error => console.error(error));
  };

  /**
   * Elimina una publicación y actualiza el estado.
   * @param {number} postId - ID de la publicación a eliminar.
   */
  const deletePost = (postId) => {
    Alert.alert(
      "Eliminar Publicación",
      "¿Estás seguro de que quieres eliminar esta publicación?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Eliminar", 
          onPress: () => {
            fetch(`${baseURL}/posts/${postId}`, { method: 'DELETE' })
              .then(() => {
                setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
              })
              .catch(error => console.error(error));
          }
        }
      ]
    );
  };

  /**
   * Filtra las publicaciones según el término de búsqueda.
   * @returns {Array} Lista de publicaciones filtradas.
   */
  const filteredPosts = () => {
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.title}</Text>
      <Image source={{ uri: item.image }} style={styles.image} />
      {item.comments.map(comment => (
        <Text key={comment.id} style={styles.comment}>{comment.body}</Text>
      ))}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePost(item.id)}
      >
        <Text style={styles.deleteButtonText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar publicación..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredPosts()}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  comment: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  deleteButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  searchInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default App;
