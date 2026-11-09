#!/usr/bin/env bash
# 9 s "just listen" Reel from the owner's backlit rooftop clip B (brightened), original sound enhanced.
set -euo pipefail
R=../../assets/raw/elephant_rooftop_B.mp4; T=$(mktemp -d)
VF="fps=30,hqdn3d=1.5:1.5:4:4,curves=master='0/0 0.25/0.42 0.5/0.66 1/1',eq=saturation=1.25:contrast=1.04,colorbalance=rs=0.05:bs=-0.04,scale=1080:1920:flags=lanczos,unsharp=5:5:0.7:5:5:0,setsar=1"
AF="highpass=f=120,afftdn=nf=-30:nr=10,equalizer=f=3500:t=q:w=1.2:g=3,equalizer=f=250:t=q:w=1:g=-2,acompressor=threshold=-26dB:ratio=2.5:attack=5:release=180,aresample=48000"
ffmpeg -y -loglevel error -ss 0 -t 6.4 -i $R -loop 1 -t 6.4 -i cap_b1.png -loop 1 -t 6.4 -i sticky.png -filter_complex "[0:v]$VF[b];[1:v]format=rgba,fade=in:st=0.3:d=0.4:alpha=1[o];[b][o]overlay=0:0[x];[x][2:v]overlay=0:0,format=yuv420p[v];[0:a]$AF[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 17 -c:a aac -b:a 192k -r 30 $T/s1.mp4
ffmpeg -y -loglevel error -loop 1 -t 3 -i endcard_real.png -ss 6.4 -t 3 -i $R -filter_complex "[0:v]scale=1080:1920,format=yuv420p,fps=30[v];[1:a]$AF,afade=out:st=1.6:d=1.4[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 17 -c:a aac -b:a 192k $T/s2.mp4
ffmpeg -y -loglevel error -i $T/s1.mp4 -i $T/s2.mp4 -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.3:offset=6.1,format=yuv420p[v];[0:a][1:a]acrossfade=d=0.3,loudnorm=I=-14:TP=-1.5:LRA=11,aresample=48000[a]" -map "[v]" -map "[a]" -c:v libx264 -crf 19 -preset slow -profile:v high -c:a aac -b:a 192k -movflags +faststart ../video/ad1b_listen_elephant_9x16.mp4
ffmpeg -y -loglevel error -i ../video/ad1b_listen_elephant_9x16.mp4 -vf "crop=1080:1350:0:180" -c:v libx264 -crf 19 -preset slow -c:a copy -movflags +faststart ../video/ad1b_listen_elephant_4x5.mp4
rm -rf $T; echo "built ad1b_listen_elephant (9x16, 4x5)"
