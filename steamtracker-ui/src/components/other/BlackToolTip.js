import { makeStyles } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
    fontFamily: "inherit",
    fontSize: "1rem",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

export default function BlackToolTip(props) {
  return (
    <div>
      <BootstrapTooltip title={props.content}>
        {props.children}
      </BootstrapTooltip>
    </div>
  );
}
