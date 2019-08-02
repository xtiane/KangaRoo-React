import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/Card';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItem/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import StarIcon from '@material-ui/icons/Star';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	typography: {
		padding: theme.spacing(2)
	},
	card: {
		maxWidth: 320
	},
	cardMedia: {
		height: 240
	},
	list: {
		width: '100%',
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper
	}
}));

const FosterCard = props => {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardMedia className={classes.cardMedia} image={props.cardPhotoURL} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="h2">
					{props.fosterName}
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p">
					<List className={classes.list} component="ul">
						<ListItem>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText primary={props.received} />
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText primary={props.agency} />
						</ListItem>
						<ListItem>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText primary={props.adopted} />
						</ListItem>
					</List>
				</Typography>
			</CardContent>
		</Card>
	);
};

FosterCard.propTypes = {
	cardPhotoURL: PropTypes.string.isRequired,
	fosterName: PropTypes.string.isRequired,
	received: PropTypes.string.isRequired,
	agency: PropTypes.string.isRequired,
	adopted: PropTypes.string.isRequired
};
export default FosterCard;
