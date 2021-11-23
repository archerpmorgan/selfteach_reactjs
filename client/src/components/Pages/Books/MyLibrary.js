import * as React from 'react';
import {
    Grid,
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio,
    Paper,
    Card,
    CardHeader,
    CardMedia,
    CardContent, CardActions,
    Collapse,
    Avatar,
    IconButton,
    Typography,
} from "@material-ui/core";
import { styled } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { summaryStatistics } from "../../../common/DataFunctions.js";
import { useSelector } from "react-redux";
import StatsTable from "../MyData/StatsTable";



const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function RecipeReviewCard(props) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { image, title, summaryData, ...other } = props;

    return (
        <Card sx={{ maxWidth: 5 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.title}
                subheader="Date added"
            />
            <CardMedia
                component="img"
                height="194"
                image={props.image}
                alt="book cover image"
            />
            <CardContent>
                <Typography variant="body2" color="secondary">
                    A basic summary of the book should go here
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <DeleteIcon />
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <StatsTable summaryData={summaryData} />
                </CardContent>
            </Collapse>
        </Card>
    );
}






function SpacingGrid() {
    const spacing = 8;

    const raw = useSelector((state) => state.bookdata);

    const allbooksdatacooked = [];
    raw.resources.forEach((book) => {
        let summaryData = summaryStatistics(book);
        allbooksdatacooked.push({
            title: book.title,
            image: book.imageURL,
            problemData: [
                { name: "Complete", value: summaryData.completedProblems },
                {
                    name: "Incomplete",
                    value: summaryData.totalProblems - summaryData.completedProblems,
                },
            ],
            sectionData: [
                { name: "Studied", value: summaryData.studiedSections },
                {
                    name: "Not Studied",
                    value: summaryData.totalSections - summaryData.studiedSections,
                },
            ],
            summaryData
        });
    });

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={spacing}>
                    {allbooksdatacooked.map((item, index) => (
                        <Grid key={index} item>
                            <Paper sx={{ height: 140, width: 100 }}>
                                <RecipeReviewCard
                                    title={item.title}
                                    image={item.image}
                                    summaryData={item.summaryData}>
                                </RecipeReviewCard>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default function MyLibrary() {
    return (
        <SpacingGrid></SpacingGrid>
    );
}