#!/usr/bin/env bash
# Builds the real-sound Elephant Reel from the owner's raw rooftop clip.
# Usage: bash build_realsound_reel.sh   (run from creatives/src; needs ffmpeg + bc)
set -euo pipefail
R=../../assets/raw/elephant_rooftop_A.mp4; T=$(mktemp -d)
# Video: light denoise of WhatsApp compression, upscale 478x850 -> 1080x1920, sharpen, warm/saturate slightly
VF="fps=30,hqdn3d=1.5:1.5:4:4,scale=1080:1920:flags=lanczos,unsharp=5:5:0.7:5:5:0,eq=contrast=1.06:saturation=1.2:gamma=1.02,colorbalance=rs=0.03:gs=0.01:bs=-0.03,setsar=1"
# Audio: cut wind rumble (<120 Hz), denoise hiss, lift chime presence (3.5 kHz +3 dB), trim boxiness, gentle compression
AF="highpass=f=120,afftdn=nf=-30:nr=10,equalizer=f=3500:t=q:w=1.2:g=3,equalizer=f=250:t=q:w=1:g=-2,acompressor=threshold=-26dB:ratio=2.5:attack=5:release=180,aresample=48000"
enc="-c:v libx264 -crf 17 -preset medium -c:a aac -b:a 192k -r 30"
seg1(){ ffmpeg -y -loglevel error -ss $2 -t $3 -i $R -loop 1 -t $3 -i $4 -filter_complex "[0:v]$VF[b];[1:v]format=rgba,fade=in:st=0.2:d=0.3:alpha=1[o];[b][o]overlay=0:0,format=yuv420p[v];[0:a]$AF[a]" -map "[v]" -map "[a]" $enc $1; }
seg2(){ ffmpeg -y -loglevel error -ss $2 -t $3 -i $R -loop 1 -t $3 -i $4 -loop 1 -t $3 -i $5 -filter_complex "[0:v]$VF[b];[1:v]format=rgba,fade=in:st=0.2:d=0.3:alpha=1,fade=out:st=$(echo "$6-0.3"|bc):d=0.3:alpha=1[o1];[2:v]format=rgba,fade=in:st=$6:d=0.3:alpha=1[o2];[b][o1]overlay=0:0[x];[x][o2]overlay=0:0,format=yuv420p[v];[0:a]$AF[a]" -map "[v]" -map "[a]" $enc $1; }
seg1 $T/s1.mp4 0.0 3.6 cap_1.png                 # close-up open: "Real sound. No music added"
seg2 $T/s2.mp4 11.0 6.2 cap_2.png cap_3.png 3.1  # best ringing (11-17s): product, then Vastu tip
seg1 $T/s3.mp4 20.0 3.8 cap_4.png                # close-up: price + COD
ffmpeg -y -loglevel error -loop 1 -t 2.8 -i endcard_real.png -ss 12.0 -t 2.8 -i $R -filter_complex "[0:v]scale=1080:1920,format=yuv420p,fps=30[v];[1:a]$AF,afade=out:st=1.6:d=1.2[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 17 -c:a aac -b:a 192k $T/s4.mp4
ffmpeg -y -loglevel error -i $T/s1.mp4 -i $T/s2.mp4 -i $T/s3.mp4 -i $T/s4.mp4 -filter_complex \
"[0:v][1:v]xfade=transition=fade:duration=0.25:offset=3.35[v1];[v1][2:v]xfade=transition=fade:duration=0.25:offset=9.3[v2];[v2][3:v]xfade=transition=fade:duration=0.3:offset=12.85,format=yuv420p[v];\
[0:a][1:a]acrossfade=d=0.25[a1];[a1][2:a]acrossfade=d=0.25[a2];[a2][3:a]acrossfade=d=0.3,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" \
-map "[v]" -map "[a]" -c:v libx264 -crf 19 -preset slow -profile:v high -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart ../video/ad1_realsound_elephant_9x16.mp4
ffmpeg -y -loglevel error -i ../video/ad1_realsound_elephant_9x16.mp4 -vf "crop=1080:1350:0:180" -c:v libx264 -crf 19 -preset slow -c:a copy -movflags +faststart ../video/ad1_realsound_elephant_4x5.mp4
rm -rf $T; echo "built ad1_realsound_elephant (9x16, 4x5)"
