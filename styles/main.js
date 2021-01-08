export default {
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 20,
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  topBarIcon: {
    color: '#8E44AD',
    zIndex: 2,
    marginHorizontal: 20,
  },
  mainImageBlock: {
    flex: 1,
    borderRadius: 20,
  },
  mainImage: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userinfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, .65)',
    padding: 10,
  },
  username: {
    fontWeight: '700',
    fontSize: 20,
    color: '#fff',
  },
  location: {
    color: '#fff',
    fontSize: 13,
  },
  icon: {
    backgroundColor: '#999',
    borderRadius: 200,
    padding: 20,
    marginHorizontal: 18,
  },
  bottomBar: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dislikeBtn: {
    color: 'red',
  },
  saveBtn: {
    color: 'yellow',
  },
  likeBtn: {
    color: 'red',
  },
  notFoundView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundIcon: {
    alignSelf: 'center',
    color: '#ddd',
    margin: 'auto',
  },
  notFound: {
    marginTop: 20,
    fontSize: 15,
    color: '#aaa',
  },
  notFoundButton: {
    marginTop: 15,
  },
};
