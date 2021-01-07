import React from 'react';

import { Typography, Box, Grid, Container } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import HeightIcon from '@material-ui/icons/Height';
import PaletteIcon from '@material-ui/icons/Palette';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import FastForwardIcon from '@material-ui/icons/FastForward';
import PhoneIcon from '@material-ui/icons/Phone';

const styles = {
    icons: {
        fontSize: '3rem'
    }
}

const Features = () => {
    return (
        <section className="features">
            <Container fixed>
                <Box mb={3} mt={10}>
                    <Typography variant="h2" color="textPrimary" align="center">
                        Dlaczego nasze kubki
                    </Typography>
                </Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                        <Box textAlign="center" my={2}>
                            <SettingsIcon color="primary" style={styles.icons} />

                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Możliwość dowolnej konfiguracji.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center" my={2}>
                            <HeightIcon color="primary" style={styles.icons} />
                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Różne rozmiary kubków.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center" my={2}>
                            <PaletteIcon color="primary" style={styles.icons} />
                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Różne kolory kubków.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center" my={2}>
                            <LocalOfferIcon color="primary" style={styles.icons} />
                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Ceny na każdą kieszeń.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center" my={2}>
                            <FastForwardIcon color="primary" style={styles.icons} />
                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Bardzo szybka wysyłka.
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box textAlign="center" my={2}>
                            <PhoneIcon color="primary" style={styles.icons} />
                                <Typography
                                    variant="h6"
                                    variantMapping={{ h6: 'p' }}
                                >
                                    Świetny kontakt
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </section>
    )
}

export default Features
