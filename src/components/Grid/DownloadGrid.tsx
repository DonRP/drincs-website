import GitHubIcon from '@mui/icons-material/GitHub';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TranslateIcon from '@mui/icons-material/Translate';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import DRDataGrid from 'components/DRDataGrid';
import DRIconButton from 'components/DRIconButton';
import { gameColumns } from 'page/Download/gameColumns';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export type IDownloadLink = {
    mega?: string,
    mediafire?: string,
    discord?: boolean,
    itch?: string,
    sha?: string,
}
export type IDownloadDevice = {
    name: string
    element?: JSX.Element
}
export type IDownloadGridRow = {
    id: number,
    device: IDownloadDevice
    version: string,
    download: IDownloadLink,
}

interface IDownloadGridProps {
    title: string,
    rows: IDownloadGridRow[],
    height?: number,
    openWiki?: () => void
    openDazAssert?: () => void
    openGithub?: () => void
    translate?: boolean
    logoImage?: string,
}

function DownloadGrid(props: IDownloadGridProps) {
    const { t } = useTranslation(["translation"]);
    const {
        title,
        rows: data,
        height,
        openWiki,
        openDazAssert,
        openGithub,
        translate,
        logoImage,
    } = props;
    let navigate = useNavigate();

    return (
        <DRDataGrid
            title={title}
            rows={data}
            columns={gameColumns(t)}
            height={height}
            hideFooter
            logoImage={logoImage}
            actions={
                <>
                    {openWiki &&
                        <DRIconButton
                            ariaLabel={t("wiki")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: '1.5rem' }}
                            onClick={openWiki}
                        >
                            <MenuBookIcon />
                        </DRIconButton>
                    }
                    {translate &&
                        <DRIconButton
                            ariaLabel={t("translate")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? '4.5rem' : '1.5rem' }}
                            onClick={() => navigate("/translations")}
                        >
                            <TranslateIcon />
                        </DRIconButton>
                    }
                    {openDazAssert &&
                        <DRIconButton
                            ariaLabel={t("daz_assert")}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? translate ? '7.5rem' : '4.5rem' : '1.5rem' }}
                            onClick={openDazAssert}
                        >
                            <ViewInArIcon />
                        </DRIconButton>
                    }
                    {openGithub &&
                        <DRIconButton
                            ariaLabel={"GitHub"}
                            color="neutral"
                            size="sm"
                            sx={{ position: 'absolute', top: '0.875rem', right: openWiki ? translate ? '10.5rem' : '7.5rem' : translate ? '4.5rem' : '1.5rem' }}
                            onClick={openGithub}
                        >
                            <GitHubIcon />
                        </DRIconButton>
                    }
                </>
            }
        />
    );
}

export default DownloadGrid;